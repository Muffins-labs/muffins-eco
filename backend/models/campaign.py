from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from database import Base
from datetime import datetime

class Campaign(Base):
    __tablename__ = "campaigns"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(String)
    budget = Column(Integer)  # в рублях
    status = Column(String, default="draft")  # draft, active, done
    tariff_id = Column(Integer, ForeignKey("tar user_id = Column(Integer, ForeignKey("users.id"))
    created_at = Column(DateTime, default=datetime.utcnow)

    # Связи
    user = relationship("User", back_populates="campaigns")
    tariff = relationship("Tariff", back_populates="campaigns")