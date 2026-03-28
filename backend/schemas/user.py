from pydantic import BaseModel, validator
from typing import Optional

class UserCreate(BaseModel):
    email: str
    password: str
    role: str  # 'streamer' или 'master'
    first_name: str
    last_name: Optional[str] = None
    channel_url: Optional[str] = None

    @validator('password')
    def validate_password_length(cls, v):
        if len(v) > 72:
            raise ValueError('Password must be no longer than 72 characters')
        return v

class UserResponse(BaseModel):
    id: int
    email: str
    role: str
    first_name: str
    last_name: Optional[str]
    channel_url: Optional[str]

    class Config:
        from_attributes = True  # Обновляем для Pydantic v2