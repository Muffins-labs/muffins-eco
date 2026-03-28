from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str):
    # Обрезаем до 72 символов
    truncated_password = password[:72]
    try:
        return pwd_context.hash(truncated_password)
    except Exception as e:
        print(f"Error hashing password: {e}")
        raise

def verify_password(plain_password: str, hashed_password: str):
    try:
        return pwd_context.verify(plain_password[:72], hashed_password)
    except Exception as e:
        print(f"Error verifying password: {e}")
        return False