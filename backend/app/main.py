from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from app.schemas import SmokePredictionRequest, SmokePredictionResponse
from app.predictor import predict_smoke_risk

app = FastAPI(
    title="Smoke Risk Prediction API",
    version="1.0.0"
)

# Allow React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/predict", response_model=SmokePredictionResponse)
def predict(payload: SmokePredictionRequest):
    try:
        return predict_smoke_risk(payload.dict())
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
