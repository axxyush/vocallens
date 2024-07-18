"""
Speech transcription functions.
"""

import os

import torch

from transformers import pipeline, Wav2Vec2FeatureExtractor, Wav2Vec2CTCTokenizer


PHONETIC_MODEL_PATH = os.environ.get("PHONETIC_MODEL_PATH", "mrrubino/wav2vec2-large-xlsr-53-l2-arctic-phoneme")
ORTHOGRAPHIC_MODEL_PATH = os.environ.get("ORTHOGRAPHIC_MODEL_PATH", "openai/whisper-medium")
VOCAB_PATH = os.environ.get("VOCAB_PATH")
DEVICE = "cuda:0" if torch.cuda.is_available() else "cpu"


print(f"Loading phonetic transcription model at {PHONETIC_MODEL_PATH}")
kwargs = {}
if os.path.exists(PHONETIC_MODEL_PATH):
    if VOCAB_PATH is None:
        raise Exception("The environment variable 'VOCAB_PATH' must be set to load a model from disk.")
    kwargs["feature_extractor"] = Wav2Vec2FeatureExtractor(feature_size=1, sampling_rate=16000, padding_value=0.0, do_normalize=True, return_attention_mask=False)
    kwargs["tokenizer"] = Wav2Vec2CTCTokenizer(VOCAB_PATH, unk_token="[UNK]", pad_token="[PAD]", word_delimiter_token=" ")

phonetic_pipeline = pipeline(
    "automatic-speech-recognition",
    model=PHONETIC_MODEL_PATH,
    chunk_length_s=30,
    device=DEVICE,
    **kwargs)


print(f"Loading orthographic transcription model at {ORTHOGRAPHIC_MODEL_PATH}")
orthographic_pipeline = pipeline(
    "automatic-speech-recognition",
    model=ORTHOGRAPHIC_MODEL_PATH,
    chunk_length_s=30,
    device=DEVICE)


# Wraps pipeline to change behavior based on pipeline input type.
def pipeline_adapter(paths, pipeline_func, key):
    if isinstance(paths, str):
        return pipeline_func(paths)[key]
    else:
        return [out[key] for out in pipeline_func(paths)]


# Generates phonetic transcription for the WAV file at path.
def get_phonetic_transcription(paths):
    return pipeline_adapter(paths, lambda x: phonetic_pipeline(x), "text")


# Generates phonetic transcription chunks for the WAV file at path.
# The chunks are a list of dictionaries, where each dictionary
# contains the keys 'text' and 'timestamp'. The key 'text' maps to
# an individual phone, and the key 'timestamp' maps to a length 2
# tuple of floats indicating the start and stop time of the phone
# in seconds.
def get_phonetic_transcription_chunks(paths, timestamp="char"):
    return pipeline_adapter(paths, lambda x: phonetic_pipeline(x, batch_size=8, return_timestamps=timestamp), "chunks")


# Generates orthographic transcription for the WAV file at path.
def get_orthographic_transcription(paths):
    return pipeline_adapter(paths, lambda x: orthographic_pipeline(x), "text")


# Generates orthographic transcription chunks for the WAV file at path.
# The chunks are a list of dictionaries, where each dictionary
# contains the keys 'text' and 'timestamp'. The key 'text' maps to
# a section of speech, and the key 'timestamp' maps to a length 2
# tuple of floats indicating the start and stop time of the section
# in seconds.
def get_orthographic_transcription_chunks(paths, timestamp=True):
    return pipeline_adapter(paths, lambda x: orthographic_pipeline(x, batch_size=8, return_timestamps=timestamp), "chunks")

