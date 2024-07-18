"""
Functions for acoustic PLM detection.
"""

import os
import shutil
import subprocess

import kaldi_io
import librosa
import parselmouth

from asr.transcription import get_phonetic_transcription
from biomarker import ce_extract, ce_header
from model import load_plm, load_abd_sli, load_abd_scaler
from util import save_signal_to_corpus, ipa2arpa


F = 3
C = 13
B = 7


# Preprocesses a corpus on disk to prepare for Kaldi GOP recipe.
def preprocess_corpus(corpus_path):
    recipe = os.path.join('..', 'kaldi', 'egs', 'gop', 's5')
    sample_path = os.path.join(recipe, "data", "sample")

    if os.path.exists(sample_path):
        shutil.rmtree(sample_path)
    os.mkdir(sample_path)

    phone_map = {}
    with open(os.path.join(recipe, 'data', 'lang_nosp', 'phones.txt')) as f:
        for line in f:
            phone, id = line.split()
            phone_map[phone] = id

    def patch_phone_map(src, dst):
        for s in {"S", "B", "I", "E"}:
            phone_map[src+"_"+s] = phone_map[dst+"_"+s]

    patch_phone_map("A", "AA")
    patch_phone_map("E", "EH")
    patch_phone_map("O", "OW")
    patch_phone_map("H", "HH")
    patch_phone_map("D͡", "D")
    patch_phone_map("S͡", "S")
    patch_phone_map("T͡", "T")
    patch_phone_map('K͡', "K")
    patch_phone_map('͡', "SIL")

    def to_suffixed(arpa):
        if len(arpa) == 0:
            return arpa
        elif len(arpa) == 1:
            return [arpa[0]+"_S"]
        else:
            return [arpa[0]+"_B"] + [a+"_I" for a in arpa[1:-1]] + [arpa[-1]+"_E"]

    with open(os.path.join(recipe, 'wav.scp'), 'w') as w, open(os.path.join(recipe, 'spk2utt'), 'w') as s, open(os.path.join(recipe, 'data', 'sample', 'text.int'), 'w') as t, open(os.path.join(recipe, 'data', 'sample', 'text-phone.int'), 'w') as tp:
        count = 1
        word_map = {}

        for speaker in os.listdir(corpus_path):
            speaker_path = os.path.join(corpus_path, speaker)
            utterances = os.listdir(speaker_path)

            utterance_names = []
            for utterance in utterances:
                utterance_path = os.path.join(speaker_path, utterance)
                utterance_name = f"{speaker}-{utterance.split('.')[0]}"
                utterance_names.append(utterance_name)

                transcription = get_phonetic_transcription(utterance_path)
                words = transcription.split()
                arpa = [ipa2arpa(ipa) for ipa in words]
                phone_ids = [[phone_map[x.upper()] for x in to_suffixed(phones)] for phones in arpa]
                w.write(f"{utterance_name} ../../../../backend/{corpus_path}/{speaker}/{utterance}\n")

                for word in words:
                    if word not in word_map:
                        word_map[word] = str(count)
                        count += 1

                word_ids = [word_map[word] for word in words]
                t.write(f"{utterance_name} {' '.join(word_ids)}\n")
             
                for i,phones in enumerate(phone_ids):
                    tp.write(f"{utterance_name}.{i} {' '.join(phones)}\n")

            s.write(f"{speaker} {' '.join(utterance_names)}\n")


# Computes the GOP of a corpus on disk and returns the scores and phone timestamps.
def compute_gop(corpus_path):
    preprocess_corpus(corpus_path)
    recipe_path = os.path.join("..", "kaldi", "egs", "gop", "s5")
    subprocess.Popen("./run.sh", cwd=recipe_path).wait()

    gop_data = {}
    gop_data_path = os.path.join(recipe_path, 'data', 'sample', 'gop.txt')
    with open(gop_data_path) as f:
        for line in f:
            if line:
                utterance, score, phone = line.split("\t")
                utterance = utterance.split(".")[0]
                gop_data.setdefault(utterance, []).append(float(score))

    timestamp_data = {}
    timestamp_data_path = os.path.join(recipe_path, 'data', 'sample', 'ali-phone.ark')
    if os.path.exists(timestamp_data_path):
        for key, ali in kaldi_io.read_ali_ark(timestamp_data_path):
            phone_tuples = []
            phone = index = None

            for i, id in enumerate(ali):
                if id != phone:
                    if phone is not None and index is not None:
                        phone_tuples.append((phone, index, i-1))
                    phone = id
                    index = i

            if phone is not None and index is not None:
                phone_tuples.append((phone, index, len(ali)-1))

            timestamp_data[key] = [(start*.01, (end+1)*.01) for phone,start,end in phone_tuples if phone not in range(3)]
    
    return gop_data, timestamp_data


# Computes the acoustic features for the given corpus.
def compute_features(corpus_path):
    gop_data, timestamp_data = compute_gop(corpus_path)
    utterances = sorted(gop_data.keys(), key=lambda x: int(x.split("-")[-1]))

    features = []
    for utterance in utterances:
        gop = gop_data.get(utterance, [])
        timestamp = timestamp_data.get(utterance, [])

        # There should be one GOP score for each phone
        if len(gop) != len(timestamp):
            continue

        speaker, sample = utterance.split("-", 1)
        sample_path = os.path.join(corpus_path, speaker, sample+".wav")
        signal, sr = librosa.load(sample_path, sr=16000)
        snd = parselmouth.Sound(signal, sr)

        for gop, (start, end) in zip(gop, timestamp):
            start_sample = int(start*sr)
            end_sample = int(end*sr)

            sample = signal[start_sample:end_sample]
            window_length = end_sample - start_sample
            duration = end-start

            fb = snd.to_formant_burg(time_step=duration, window_length=duration / 2)
            kwargs = {"y": sample, "n_fft": window_length, "hop_length": window_length+1, "sr": sr}

            feature = [
                *[fb.get_value_at_time(i, fb.frame_number_to_time(1)) for i in range(1,F+1)],
                *librosa.feature.mfcc(**kwargs, n_mfcc=C).squeeze(),
                *librosa.feature.spectral_contrast(**kwargs, n_bands=B-1).squeeze(),
                float(librosa.feature.spectral_bandwidth(**kwargs).squeeze()),
                gop,
            ]
            features.append(feature)

    return features


# Performs ABD on an input signal and returns the CE sequence, biomarkers, and SLI probability.
def analyze_abd(signal, sr=16000):
    corpus_path = save_signal_to_corpus(signal, sr)
    features = compute_features(corpus_path)

    model = load_plm()
    pred = model.predict(features)
    ce = "".join("C" if x else "E" for x in pred)
    biomarkers = ce_extract(ce)
    
    model = load_abd_sli()
    _, sli_proba = model.predict_proba([biomarkers])[0]

    scaler = load_abd_scaler()
    scaled_biomarkers = scaler.transform([biomarkers])[0]

    return ce, {k: v for k,v in zip(ce_header(), scaled_biomarkers)}, sli_proba, features
