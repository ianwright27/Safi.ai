from pydantic import BaseModel, Field

class SmokePredictionRequest(BaseModel):
    window_start_min: int = Field(..., ge=0, le=1440)
    window_end_min: int = Field(..., ge=0, le=1440)
    window_length_min: int = Field(..., gt=0, le=1440)

    day: str
    weather: str
    occassion: str   # keep spelling exactly as trained


class SmokePredictionResponse(BaseModel):
    smoke_probability: float
    alert: int
