from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class CampaignCreate(BaseModel):
    title: str
    description: str
    budget: int
    tariff_id: int  # ID тарифа
    user_id: int    # ID пользователя

class CampaignResponse(BaseModel):
    id: int
    title: str
    description: str
    budget: int
    status: str
    tariff_id: int
    user_id: int
    created_at: datetime

    class Config:
        from_attributes = True