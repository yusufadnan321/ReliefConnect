import os
from typing import List, Optional

from fastapi import FastAPI, HTTPException, Depends, Query
from sqlalchemy.orm import Session

from .services.auth_service import AuthService
from .models.person import Donor, Vendor, Victim, Person
from .schemas import TokenData, UserCreate, UserOut
from .db.config import get_db, Base, engine
from .db.repository import DatabaseUserRepository


app = FastAPI(title="ReliefConnect Backend")

# Initialize services
auth_service = AuthService(cred_path=os.getenv("GOOGLE_APPLICATION_CREDENTIALS"))

# Create database tables on startup
Base.metadata.create_all(bind=engine)


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
def create_user(payload: UserCreate, db: Session = Depends(get_db)):
    """Create a new user in the database."""
    repo = DatabaseUserRepository(db)
    person = _create_person_from_payload(payload)
    try:
        db_model = repo.add_user(person)
        return {"uid": db_model.uid, "name": db_model.name, "email": db_model.email, "role": db_model.role}
    except KeyError as e:
        raise HTTPException(status_code=409, detail=str(e))


@app.get("/users", response_model=List[UserOut])
def list_users(role: Optional[str] = Query(None), skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    """List all users, optionally filtered by role."""
    repo = DatabaseUserRepository(db)
    users = repo.list_users(role=role) if role else repo.list_users_paginated(skip=skip, limit=limit)
    return [{"uid": u.uid, "name": u.name, "email": u.email, "role": u.role} for u in users]


@app.get("/users/{uid}", response_model=UserOut)
def get_user(uid: str, db: Session = Depends(get_db)):
    """Retrieve a single user by UID."""
    repo = DatabaseUserRepository(db)
    user = repo.get_user(uid)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return {"uid": user.uid, "name": user.name, "email": user.email, "role": user.role}


@app.put("/users/{uid}", response_model=UserOut)
def update_user(uid: str, payload: UserCreate, db: Session = Depends(get_db)):
    """Update an existing user."""
    repo = DatabaseUserRepository(db)
    user = repo.update_user(uid, name=payload.name, email=payload.email)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return {"uid": user.uid, "name": user.name, "email": user.email, "role": user.role}


@app.delete("/users/{uid}")
def delete_user(uid: str, db: Session = Depends(get_db)):
    """Delete a user by UID."""
    repo = DatabaseUserRepository(db)
    ok = repo.delete_user(uid)
    if not ok:
        raise HTTPException(status_code=404, detail="User not found")
    return {"detail": "User deleted successfully"}
