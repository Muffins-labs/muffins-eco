from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    password_hash = Column(String)
    role = Column(String)  # 'streamer', 'master'
    first_name = Column(String)
    last_name = Column(String)
    channel_url = Column(String)
    avatar_url = Column(String)
    created_at = Column(DateTime)