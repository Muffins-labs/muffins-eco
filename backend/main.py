from fastapi import FastAPI, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from database import engine, SessionLocal, Base
from models.user import User as UserModel
from models.tariff import Tariff as TariffModel
from schemas.user import UserCreate, UserResponse
from schemas.tariff import TariffCreate, TariffResponse
from utils.security import hash_password, verify_password
from utils.auth import create_access_token

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

@app.get("/")
def read_root():
    return {"message": "Welcome to Muffins Platform!"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)