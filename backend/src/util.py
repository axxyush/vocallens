"""
Utility functions to perform common
operations on speech data.
"""

import base64
import io
import os
import shutil

import soundfile as sf
from gruut_ipa import Phoneme, Phonemes

from asr.transcription import get_orthographic_transcription_chunks


# Converts a signal to a WAV data URL.
def signal_to_wav_url(signal):
    wav = signal_to_wav(signal)
    url = wav_to_url(wav)
    return url


# Converts WAV data to a WAV data URL.
def wav_to_url(wav):
    data = base64.b64encode(wav).decode()
    url = f"data:audio/wav;base64,{data}"
    return url


# Converts a signal to WAV data.
def signal_to_wav(signal):
    buffer = io.BytesIO()
    sf.write(buffer, signal, 16000, format="WAV")
    return buffer.getvalue()


# Saves the input signal to disk as a speech corpus.
def save_signal_to_corpus(signal, sr=16000):
    sf.write("stage.wav", signal, sr)
    chunks = get_orthographic_transcription_chunks("stage.wav")
    assert isinstance(chunks, list),"Chunks should be a list"

    corpus_path = "sample"
    wav_path = os.path.join(corpus_path, "wav")

    if os.path.exists(corpus_path):
        shutil.rmtree(corpus_path)
    os.mkdir(corpus_path)
    os.mkdir(wav_path)

    i = 0
    for chunk in chunks:
        start, end = chunk['timestamp']
        if start is None or end is None:
            continue

        start_i = int(start*sr)
        end_i = int(end*sr)

        sf.write(os.path.join(wav_path, f'sample-{i}.wav'), signal[start_i:end_i], sr)
        i += 1

    # sf.write(os.path.join(corpus_path, 'sample.wav'), signal, sr)
    os.remove("stage.wav")

    return corpus_path


# Converts a string in IPA to a list of phones in CMU ARPABET.
def ipa2arpa(ipa, dest="en-us/cmudict"):
    dest_phoneme_map = Phonemes.from_language(dest).gruut_ipa_map

    dest_phonemes = Phonemes()
    for k, v in dest_phoneme_map.items():
        if v in dest_phonemes.gruut_ipa_map:
            continue

        dest_phonemes.phonemes.append(Phoneme(text=k, is_ipa=False))
        dest_phonemes.ipa_map[v] = k

    dest_phonemes.update()

    return [p.text.strip("0123456789") for p in dest_phonemes.split(ipa.strip(), is_ipa=False)]


# Converts a list of phones in CMU ARPABET to a string in IPA.
def arpa2ipa(arpa, src="en-us/cmudict"):
    src_phoneme_map = Phonemes.from_language(src).gruut_ipa_map
    return ''.join(src_phoneme_map[phone].strip("ˈ") for phone in arpa if phone in src_phoneme_map)


# We need to convert sequences of ARPABET phones to a string of characters
# so they can be compared by a string comparison algorithm. This map reduces
# each ARPABET phone to a single arbitrary character so the comparison can
# be performed. The reverse mapping is computed below.
a2s = {
    "AA": "a",
    "AE": "b",
    "AH": "c",
    "AO": "d",
    "AW": "e",
    "AY": "f",
    "B":  "g",
    "CH": "h",
    "D":  "i",
    "DH": "j",
    "EH": "k",
    "ER": "l",
    "EY": "m",
    "F":  "n",
    "G":  "o",
    "HH": "p",
    "IH": "q",
    "IY": "r",
    "JH": "s",
    "K":  "t",
    "L":  "u",
    "M":  "v",
    "N":  "w",
    "NG": "x",
    "OW": "y",
    "OY": "z",
    "P":  "A",
    "R":  "B",
    "S":  "C",
    "SH": "D",
    "T":  "E",
    "TH": "F",
    "UH": "G",
    "UW": "H",
    "V":  "I",
    "W":  "J",
    "Y":  "K",
    "Z":  "L",
    "ZH": "M",
}
s2a = {v: k for k,v in a2s.items()}


# Converts a sequence in CMU ARPABET to a string for comparison.
def arpa2str(arpa):
    return "".join(a2s[a] for a in arpa if a in a2s)


# Converts a string for comparison to a sequence in CMU ARPABET.
def str2arpa(string):
    return [s2a[s] for s in string if s in s2a]

