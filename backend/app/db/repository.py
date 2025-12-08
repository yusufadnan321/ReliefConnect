"""Database repository layer demonstrating encapsulation and abstraction."""

from typing import Optional, List
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError

from app.db.models import PersonModel
from app.models.person import Person, Donor, Vendor, Victim


class PersonFactory:
    """Factory pattern for creating Person objects from database records."""

    @staticmethod
    def create_from_db_model(db_model: PersonModel) -> Person:
        """Convert database model to domain Person object."""
        role = db_model.role.lower()
        if role == "donor":
            return Donor(uid=db_model.uid, name=db_model.name, email=db_model.email)
        elif role == "vendor":
            return Vendor(uid=db_model.uid, name=db_model.name, email=db_model.email)
        elif role == "victim":
            return Victim(uid=db_model.uid, name=db_model.name, email=db_model.email)
        else:
            return Donor(uid=db_model.uid, name=db_model.name, email=db_model.email)


class DatabaseUserRepository:
    """Encapsulated repository layer for database operations.
    
    Demonstrates:
    - Encapsulation: internal _db session is private
    - Abstraction: public methods hide DB query complexity
    - Single Responsibility: handles all user persistence
    """

    def __init__(self, db: Session):
        """Initialize with SQLAlchemy session."""
        self._db = db

    def add_user(self, person: Person) -> PersonModel:
        """Create and persist a user from a Person object."""
        try:
            db_model = PersonModel(
                uid=person.uid,
                name=person.name,
                email=person.email,
                role=person.get_role(),
            )
            self._db.add(db_model)
            self._db.commit()
            self._db.refresh(db_model)
            return db_model
        except IntegrityError as e:
            self._db.rollback()
            if "UNIQUE constraint failed" in str(e):
                raise KeyError("User with this UID or email already exists")
            raise

    def get_user(self, uid: str) -> Optional[PersonModel]:
        """Retrieve a user by UID."""
        return self._db.query(PersonModel).filter(PersonModel.uid == uid).first()

    def get_user_by_email(self, email: str) -> Optional[PersonModel]:
        """Retrieve a user by email."""
        return self._db.query(PersonModel).filter(PersonModel.email == email).first()

    def update_user(self, uid: str, name: Optional[str] = None, email: Optional[str] = None) -> Optional[PersonModel]:
        """Update a user's attributes."""
        user = self.get_user(uid)
        if not user:
            return None
        if name:
            user.name = name
        if email:
            user.email = email
        self._db.commit()
        self._db.refresh(user)
        return user

    def delete_user(self, uid: str) -> bool:
        """Delete a user by UID."""
        user = self.get_user(uid)
        if not user:
            return False
        self._db.delete(user)
        self._db.commit()
        return True

    def list_users(self, role: Optional[str] = None) -> List[PersonModel]:
        """List all users or filter by role."""
        query = self._db.query(PersonModel)
        if role:
            query = query.filter(PersonModel.role == role.lower())
        return query.all()

    def list_users_paginated(self, skip: int = 0, limit: int = 10) -> List[PersonModel]:
        """List users with pagination."""
        return self._db.query(PersonModel).offset(skip).limit(limit).all()
