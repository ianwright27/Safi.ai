from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from app.schemas import SmokePredictionRequest, SmokePredictionResponse
from app.predictor import predict_smoke_risk

app = FastAPI(
    title="Safi AI API",
    version="1.0.0"
)

# Allow React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/predict", response_model=SmokePredictionResponse)
def predict(payload: SmokePredictionRequest):
    try:
        return predict_smoke_risk(payload.dict())
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# collecting data endpoint for improving model

from fastapi import Depends
from sqlalchemy.orm import Session
from app.dependencies import get_db
from app.models import SmokeObservation 
from app.database import Base, engine
from pydantic import BaseModel

Base.metadata.create_all(bind=engine)
    

class SmokeDataIn(BaseModel):
    time_opening_windows: str
    time_closing_windows: str
    smoke_detected: bool
    time_sensing_smoke: str
    duration: str
    date: str
    day: str
    occassion: str
    weather: str
    type_of_smoke: str
    lat: float
    long: float

@app.post("/collect-data")
def collect_data(data: SmokeDataIn, db: Session = Depends(get_db)):
    record = SmokeObservation(**data.dict())
    db.add(record)
    db.commit()
    db.refresh(record)

    return {"status": "saved", "id": record.id}
