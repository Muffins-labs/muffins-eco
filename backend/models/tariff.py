from sqlalchemy import Column, Integer, String, JSON, DateTime
from database import Base
from datetime import datetime

class Tariff(Base):
    __tablename__ = "tariffs"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    price = Column(Integer)  # в рублях
    services = Column(JSON)  # ["cover_design", "obs_setup"]
    created_at = Column(DateTime, default=datetime.utcnow)