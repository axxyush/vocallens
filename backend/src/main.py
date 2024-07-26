"""
Application entrypoint.
"""


from http import HTTPStatus

import numpy as np
from flask import Flask, request

from validate import load
from plm.acoustic import analyze_abd
from plm.transcription import analyze_tbd
from asr.diarize import diarize
from util import signal_to_wav_url


app = Flask(__name__)

BASE_PATH = "/vocallens/api"
NOISE_THRESHOLD = 10


# Validates the input and returns diarized speech segments.
@app.route(BASE_PATH+"/validate", methods=["POST"])
def validate():
    data = request.json.get("data")
    speakers = request.json.get("speakers")

    try:
        signal, _ = load(data)
    except Exception as e:
        print(e)
        return "Invalid body.", HTTPStatus.BAD_REQUEST
    
    try:
        speakers = max(1, int(speakers))
    except:
        speakers = 1

    try:
        result = diarize(signal, speakers)
    except Exception as e:
        print(e)
        return "Diarization failed.", HTTPStatus.BAD_REQUEST
    
    order = []
    audios = {}
    for speaker, start, end in result:
        if not speaker in audios:
            order.append(speaker)
            audios[speaker] = []
        s0 = int(start*16000)
        s1 = int(end*16000)
        audios[speaker].append(signal[s0:s1])
    resp = [signal_to_wav_url(np.concatenate(audios[speaker])) for speaker in order]

    return resp, HTTPStatus.OK


# Analyzes the input and returns SLI result.
@app.route(BASE_PATH+"/analyze", methods=["POST"])
def analyze():
    try:
        data = request.json
        signals = [load(d) for d in data]
        signal = np.concatenate([s for s,_ in signals])
        sr = signals[0][1]
    except Exception as e:
        print(e)
        return "Invalid body.", HTTPStatus.BAD_REQUEST

    duration = len(signal) / sr
    ce, biomarkers, sli_proba, features = analyze_abd(signal, sr)
    # ce, biomarkers, sli_proba = analyze_tbd(signal, sr)
    return {"ce": ce, "biomarkers": biomarkers, "sli_proba": sli_proba, "features": [[float(x) for x in row] for row in features], "duration": duration}, HTTPStatus.OK


if __name__ == "__main__":
    app.run(port=8080, debug=True)

