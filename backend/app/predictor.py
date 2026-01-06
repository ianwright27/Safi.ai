import pandas as pd
from model import get_pipeline

THRESHOLD = 0.25

def predict_smoke_risk(input_dict: dict):
    pipeline = get_pipeline()

    df_input = pd.DataFrame([input_dict])

    prob = pipeline.predict_proba(df_input)[0][1]
    alert = int(prob >= THRESHOLD)

    return {
        "smoke_probability": round(float(prob), 3),
        "alert": alert
    }
