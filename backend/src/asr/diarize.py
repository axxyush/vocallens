"""
Speaker diarization functions.
"""

import os
import tempfile

import torch
from pyannote.audio import Pipeline
from soundfile import write


pipeline = Pipeline.from_pretrained("pyannote/speaker-diarization", use_auth_token=True)
if torch.cuda.is_available():
    pipeline.to(torch.device("cuda"))


# Diarizes the input signal and returns the speech intervals.
def diarize(signal, speakers, include_silence=True):
    tf = tempfile.NamedTemporaryFile(delete=False)
    tf.close()
    write(tf.name, signal, 16000, format="WAV")

    try:
        result = pipeline(tf.name, num_speakers=speakers)

        if not include_silence:
            return [(speaker, segment.start, segment.end) for segment, speaker in result.itertracks()]

        intervals = []
        for segment, speaker in result.itertracks():
            if intervals and intervals[-1][0] == speaker:
                speaker, start, _ = intervals.pop()
                intervals.append((speaker, start, segment.end))
            else:
                intervals.append((speaker, segment.start, segment.end))
        return intervals
    finally:
        os.remove(tf.name)
