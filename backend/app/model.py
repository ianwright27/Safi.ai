import joblib
from pathlib import Path

MODEL_PATH = Path("../models/smoke_prediction_pipeline_v1.joblib")

_pipeline = None

def get_pipeline():
    global _pipeline
    if _pipeline is None:
        _pipeline = joblib.load(MODEL_PATH)
    return _pipeline
