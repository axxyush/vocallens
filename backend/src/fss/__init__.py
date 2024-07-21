import ctypes
import os

from string2string.distance import LevenshteinEditDistance


VIRTUAL_ENV = os.environ.get("VIRTUAL_ENV", ".")
DLL_PATH = os.path.abspath(os.path.join(VIRTUAL_ENV, "..", "src", "fss", "c", "libfss.so"))

try:
    lib = ctypes.CDLL(DLL_PATH)
    lib.get_nearest_word.argtypes = [ctypes.c_char_p, ctypes.POINTER(ctypes.c_char_p), ctypes.c_int]
    lib.get_nearest_word.restype = ctypes.c_char_p
    fallback = False
except:
    print("Failed to load libfss.so. Falling back to Python implementation.")
    fallback = True


def get_nearest_word_python(src, dictionary):
    distance = LevenshteinEditDistance()
    F = lambda x: distance.compute(src, x)
    return min((word for word in dictionary), key=F)


def get_nearest_word(src, dictionary):
    encoded_dictionary = [s.encode() for s in dictionary]
    c_strings = (ctypes.c_char_p * len(encoded_dictionary))(*encoded_dictionary)

    nearest = lib.get_nearest_word(src.encode(), c_strings, len(c_strings))
    return nearest.decode() if nearest is not None else nearest


if fallback:
    get_nearest_word = get_nearest_word_python

