"""
Routines for loading machine learning models.
Consumed by inference code.
"""

import pickle


# Loads and returns the pickled model at the specified path.
def load(path):
    with open(path, "rb") as f:
        return pickle.load(f)


# Loads and returns the PLM detection model.
def load_plm():
    return load("src/model/plm.pkl")


# Loads and returns the ABD SLI model.
def load_abd_sli():
    return load("src/model/abd_sli.pkl")


# Loads and returns the ABD biomarker scaler.
def load_abd_scaler():
    return load("src/model/abd_scaler.pkl")


# Loads and returns the TBD SLI model.
def load_tbd_sli():
    return load("src/model/tbd_sli.pkl")

