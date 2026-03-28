from pydantic import BaseModel
from typing import List
from datetime import datetime

class TariffCreate(BaseModel):
    name: str
    price: int
    services: List[str]  # ["cover_design", "obs_setup"]

class TariffResponse(BaseModel):
    id: int
    name: str
    price: int
    services: List[str]
    created_at: datetime

    class Config:
        from_attributes = True