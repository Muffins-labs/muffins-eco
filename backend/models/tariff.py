from sqlalchemy import Column, Integer, String, JSON

class Tariff(Base):
    __tablename__ = "tariffs"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    price = Column(Integer)
    services = Column(JSON)  # ["cover_design", "obs_setup"]