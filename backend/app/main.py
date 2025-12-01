import os
from typing import List

from fastapi import FastAPI, HTTPException

from .services.auth_service import AuthService
from .models.user_repo import UserRepository
from .models.person import Donor, Vendor, Victim, Person
from .schemas import TokenData, UserCreate, UserOut


app = FastAPI(title="ReliefConnect Backend (Demo)")

# Initialize services
auth_service = AuthService(cred_path=os.getenv("GOOGLE_APPLICATION_CREDENTIALS"))
repo = UserRepository()


@app.post("/verify-token")
def verify_token(payload: TokenData):
    """Verify Firebase ID token and return decoded claims."""
    try:
        decoded = auth_service.verify_id_token(payload.id_token)
        return decoded
    except Exception as e:
        raise HTTPException(status_code=401, detail=str(e))


def _create_person_from_payload(data: UserCreate) -> Person:
    role = (data.role or "donor").lower()
    if role == "donor":
        return Donor(uid=data.uid, name=data.name, email=data.email)
    if role == "vendor":
        return Vendor(uid=data.uid, name=data.name, email=data.email)
    if role == "victim":
        return Victim(uid=data.uid, name=data.name, email=data.email)
    # fallback
    return Donor(uid=data.uid, name=data.name, email=data.email)


@app.post("/users", response_model=UserOut)
def create_user(payload: UserCreate):
    person = _create_person_from_payload(payload)
    try:
        repo.add_user(person)
    except KeyError:
        raise HTTPException(status_code=409, detail="User already exists")
    return {"uid": person.uid, "name": person.name, "email": person.email, "role": person.get_role()}


@app.get("/users", response_model=List[UserOut])
def list_users():
    users = repo.list_users()
    return [{"uid": u.uid, "name": u.name, "email": u.email, "role": u.get_role()} for u in users]


@app.get("/users/{uid}", response_model=UserOut)
def get_user(uid: str):
    user = repo.get_user(uid)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return {"uid": user.uid, "name": user.name, "email": user.email, "role": user.get_role()}


@app.put("/users/{uid}", response_model=UserOut)
def update_user(uid: str, payload: UserCreate):
    user = repo.update_user(uid, name=payload.name, email=payload.email)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return {"uid": user.uid, "name": user.name, "email": user.email, "role": user.get_role()}


@app.delete("/users/{uid}")
def delete_user(uid: str):
    ok = repo.delete_user(uid)
    if not ok:
        raise HTTPException(status_code=404, detail="User not found")
    return {"detail": "deleted"}
