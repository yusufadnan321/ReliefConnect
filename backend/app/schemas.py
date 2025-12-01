from pydantic import BaseModel, EmailStr
from typing import Optional


class TokenData(BaseModel):
    id_token: str


class UserCreate(BaseModel):
    uid: str
    name: str
    email: EmailStr
    role: Optional[str] = "donor"


class UserOut(BaseModel):
    uid: str
    name: str
    email: EmailStr
    role: str
