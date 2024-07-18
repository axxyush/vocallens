"""
Functions for transcription PLM detection.
"""

import os

import requests
from string2string.alignment import NeedlemanWunsch

from asr.transcription import get_phonetic_transcription
from biomarker import ce_extract, ce_header
from fss import get_nearest_word
from model import load_tbd_sli
from util import save_signal_to_corpus, ipa2arpa, arpa2str, str2arpa



# Returns a lexicon mapping English words
# to their phonetic transcription in ARPABET.
lexicons = {}
def get_lexicon(src="http://svn.code.sf.net/p/cmusphinx/code/trunk/cmudict/cmudict-0.7b"):
    global lexicons

    lexicon = lexicons.get(src)
    if lexicon is not None:
        return lexicon

    lexicon = {}

    lexicon_response = requests.get(src)
    for line in lexicon_response.text.split("\n"):
        if not line or line.startswith(";;;"):
            continue

        try:
            word, phones = line.split("\t")
        except:
            word, phones = line.split(" ", 1)
        lexicon[word] = [phone.strip("0123456789") for phone in phones.split()]

    lexicons[src] = lexicon
    return lexicon


# Returns a list of pronunciations of
# English words in string representation.
dictionaries = {}
def get_dictionary(src="http://svn.code.sf.net/p/cmusphinx/code/trunk/cmudict/cmudict-0.7b"):
    global dictionaries

    dictionary = dictionaries.get(src)
    if dictionary is not None:
        return dictionary

    lexicon = get_lexicon(src)
    dictionary = [arpa2str(phones) for phones in lexicon.values()]

    dictionaries[src] = dictionary
    return dictionary


# Returns the nearest word sequence in the lexicon
# located at src to the input word sequence. A word
# sequence is a list of ARPABET phones that form a word.
def get_nearest_word_sequence(word_sequence, src="http://svn.code.sf.net/p/cmusphinx/code/trunk/cmudict/cmudict-0.7b"):
    word = arpa2str(word_sequence)
    dictionary = get_dictionary(src)
    nearest = get_nearest_word(word, dictionary)

    return str2arpa(nearest)


# Computes the phonetic transcription of a corpus in ARPABET
def compute_phonetic_transcription(corpus_path, speaker="wav"):
    speaker_path = os.path.join(corpus_path, speaker)
    utterances = sorted(os.listdir(speaker_path), key=lambda x: int(x.split(".")[0].split("-")[-1]))
    phonetic_transcriptions = [[ipa2arpa(word) for word in get_phonetic_transcription(os.path.join(speaker_path, utterance)).strip().split()] for utterance in utterances]
    return sum(phonetic_transcriptions, [])


# Computes the target phonetic transcription based on an actual transcription
def compute_target_transcription(phonetic_transcription):
    return [get_nearest_word_sequence(word) for word in phonetic_transcription]


# Generates a CE sequence based on the source and target word transcriptions
nw = NeedlemanWunsch()
def to_ce_sequence(src_word, tgt_word):
    a_src_word, a_tgt_word = nw.get_alignment(src_word, tgt_word)
    a_src_word = a_src_word.replace(" ", "").split("|")
    a_tgt_word = a_tgt_word.replace(" ", "").split("|")
    return "".join("C" if x == y else "E" for x, y in zip(a_src_word, a_tgt_word))


# Performs TBD on an input signal and returns the CE sequence, biomarkers, and SLI probability.
def analyze_tbd(signal, sr=16000):
    corpus_path = save_signal_to_corpus(signal, sr)
    phonetic_transcription = compute_phonetic_transcription(corpus_path)
    target_transcription = compute_target_transcription(phonetic_transcription)

    ce = "".join(to_ce_sequence(*x) for x in zip(phonetic_transcription, target_transcription))
    biomarkers = ce_extract(ce)
    
    model = load_tbd_sli()
    _, sli_proba = model.predict_proba([biomarkers])[0]

    # TODO: Scale biomarkers

    return ce, {k: v for k,v in zip(ce_header(), biomarkers)}, sli_proba
