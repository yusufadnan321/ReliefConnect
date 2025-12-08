"""SQLAlchemy ORM models demonstrating inheritance and abstraction."""

from sqlalchemy import Column, String, DateTime, func
from datetime import datetime
from app.db.config import Base


class PersonModel(Base):
    """Base Person model with common attributes (table inheritance)."""

    __tablename__ = "persons"

    uid = Column(String, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False, index=True)
    role = Column(String, nullable=False, index=True)  # donor, vendor, victim
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def __repr__(self):
        return f"<Person(uid={self.uid}, name={self.name}, role={self.role})>"
