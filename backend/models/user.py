from sqlalchemy import Column, Integer, String, DateTime
from database import Base
from datetime import datetime

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    password_hash = Column(String)
    role = Column(String)  # 'streamer' или 'master'
    first_name = Column(String)
    last_name = Column(String)
    channel_url = Column(String)
    avatar_url = Column(String)
    campaigns = relationship("Campaign", back_populates="user")
    created_at = Column(DateTime, default=datetime.utcnow)