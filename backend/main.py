from fastapi import FastAPI, Depends, HTTPException, status, Security
from sqlalchemy.orm import Session
from typing import List
from fastapi.middleware.cors import CORSMiddleware

from database import engine, SessionLocal, Base
from models.user import User as UserModel
from models.tariff import Tariff as TariffModel
from models.campaign import Campaign as CampaignModel
from schemas.user import UserCreate, UserResponse
from schemas.tariff import TariffCreate, TariffResponse
from schemas.campaign import CampaignCreate, CampaignResponse
from utils.security import hash_password, verify_password
from utils.auth import create_access_token, get_current_user

# Создаём все таблицы
Base.metadata.create_all(bind=engine)

app = FastAPI()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/register", response_model=UserResponse)
def register_user(user_data: UserCreate, db: Session = Depends(get_db)):
    # Проверяем, существует ли уже юзер
    existing_user = db.query(UserModel).filter(UserModel.email == user_data.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    # Хешируем пароль
    hashed_pw = hash_password(user_data.password)

    # Создаём нового юзера
    db_user = UserModel(
        email=user_data.email,
        password_hash=hashed_pw,
        role=user_data.role,
        first_name=user_data.first_name,
        last_name=user_data.last_name,
        channel_url=user_data.channel_url
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    return db_user

@app.post("/login")
def login_user(email: str, password: str, db: Session = Depends(get_db)):
    user = db.query(UserModel).filter(UserModel.email == email).first()
    if not user or not verify_password(password, user.password_hash):
        raise HTTPException(status_code=400, detail="Invalid credentials")
    
    token = create_access_token(data={"sub": user.email})
    return {"access_token": token, "token_type": "bearer"}

@app.get("/me", response_model=UserResponse)
def get_current_user_profile(current_email: str = Security(get_current_user), db: Session = Depends(get_db)):
    user = db.query(UserModel).filter(UserModel.email == current_email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@app.post("/tariffs", response_model=TariffResponse)
def create_tariff(tariff_data: TariffCreate, db: Session = Depends(get_db)):
    db_tariff = TariffModel(
        name=tariff_data.name,
        price=tariff_data.price,
        services=tariff_data.services
    )
    db.add(db_tariff)
    db.commit()
    db.refresh(db_tariff)
    return db_tariff

@app.get("/tariffs", response_model=List[TariffResponse])
def get_tariffs(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    tariffs = db.query(TariffModel).offset(skip).limit(limit).all()
    return tariffs

@app.post("/campaigns", response_model=CampaignResponse)
def create_campaign(campaign_data: CampaignCreate, db: Session = Depends(get_db)):
    # Проверяем, существует ли пользователь и тариф
    user = db.query(UserModel).filter(UserModel.id == campaign_data.user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    tariff = db.query(TariffModel).filter(TariffModel.id == campaign_data.tariff_id).first()
    if not tariff:
        raise HTTPException(status_code=404, detail="Tariff not found")

    db_campaign = CampaignModel(
_data.title,
        description=campaign_data.description,
        budget=campaign_data.budget,
        tariff_id=campaign_data.tariff_id,
        user_id=campaign_data.user_id
    )
    db.add(db_campaign)
    db.commit()
    db.refresh(db_campaign)
    return db_campaign

@app.get("/users/{user_id}/campaigns", response_model=List[CampaignResponse])
def get_user_campaigns(user_id: int, skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    campaigns = db.query(CampaignModel).filter(CampaignModel.user_id == user_id).offset(skip).limit(limit).all()
    return campaigns

@app.put("/campaigns/{campaign_id}", response_model=CampaignResponse)
def update_campaign(campaign_id: int, title: str = None, description: str = None, budget: int = None, db: Session = Depends(get_db)):
    db_campaign = db.query(CampaignModel).filter(CampaignModel.id == campaign_id).first()
    if not db_campaign:
        raise HTTPException(status_code=404, detail="Campaign not found")

    if title:
        db_campaign.title = title
    if description:
        db_campaign.description = description
    if budget:
        db_campaign.budget = budget

    db.commit()
    db.refresh(db_campaign)
    return db_campaign

@app.delete("/campaigns/{campaign_id}")
def delete_campaign(campaign_id: int, db: Session = Depends(get_db)):
    db_campaign = db.query(CampaignModel).filter(CampaignModel.id == campaign_id).first()
    if not db_campaign:
        raise HTTPException(status_code=404, detail="Campaign not found")

    db.delete(db_campaign)
    db.commit()
    return {"detail": "Campaign deleted successfully"}

@app.get("/")
def read_root():
    return {"message": "Welcome to Muffins Platform!"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)