from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from app.models import User
from app.db import get_session
from app.auth import hash_password
from pydantic import BaseModel, EmailStr

router = APIRouter(prefix="/users", tags=["Users"])

class UserCreate(BaseModel):
    email: EmailStr
    password: str
    full_name: str

class UserRead(BaseModel):
    id: int
    email: EmailStr
    full_name: str

@router.post("/", response_model=UserRead)
def create_user(user: UserCreate, session: Session = Depends(get_session)):
    existing_user = session.exec(select(User).where(User.email == user.email)).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    new_user = User(
        email=user.email,
        hashed_password=hash_password(user.password),
        full_name=user.full_name
    )
    session.add(new_user)
    session.commit()
    session.refresh(new_user)
    return new_user
