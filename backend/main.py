from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from database import engine, SessionLocal, Base
from models.user import User as UserModel
from schemas.user import UserCreate, UserResponse
from utils.security import hash_password

# Создаём таблицы
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

@app.get("/")
def read_root():
    return {"message": "Welcome to Muffins Platform!"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)