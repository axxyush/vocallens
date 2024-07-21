"""
Validation routines for user-supplied inputs.
"""

import base64
import os
import subprocess
import tempfile

import librosa
import numpy as np


# Loads an audio data URL and returns the signal and sample rate.
def load(data_url):
    data = base64.b64decode(data_url.split(",", 1)[-1])

    tfi = tempfile.NamedTemporaryFile(delete=False)
    tfi.write(data)
    tfi.close()

    tfo = tempfile.NamedTemporaryFile(delete=False)
    tfo.close()

    try:
      subprocess.run(["ffmpeg", "-i", tfi.name, "-f", "wav", tfo.name, "-y"])
      return librosa.load(tfo.name, sr=16000)
    finally:
       os.remove(tfi.name)
       os.remove(tfo.name)

