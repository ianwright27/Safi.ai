from sqlalchemy import Column, Integer, Float, String, Boolean, DateTime
from datetime import datetime
from database import Base

class SmokeObservation(Base):
    __tablename__ = "smoke_observations"

    id = Column(Integer, primary_key=True, index=True)

    time_opening_windows = Column(String)
    time_closing_windows = Column(String)
    smoke_detected = Column(Boolean)

    time_sensing_smoke = Column(String)
    duration = Column(String)

    date = Column(String)
    day = Column(String)
    occassion = Column(String)
    weather = Column(String)
    type_of_smoke = Column(String)

    lat = Column(Float)
    long = Column(Float)

    created_at = Column(DateTime, default=datetime.utcnow)