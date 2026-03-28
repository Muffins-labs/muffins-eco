from pydantic import BaseModel
from typing import Optional

class UserCreate(BaseModel):
    email: str
    password: str
    role: str  # 'streamer' или 'master'
    first_name: str
    last_name: Optional[str] = None
    channel_url: Optional[str] = None

class UserResponse(BaseModel):
    id: int
    email: str
    role: str
    first_name: str
    last_name: Optional[str]
    channel_url: Optional[str]

    class Config:
        from_attributes = True