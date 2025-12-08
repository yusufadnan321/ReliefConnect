"""User service layer demonstrating abstraction and business logic encapsulation."""

from typing import Optional, List
from sqlalchemy.orm import Session

from app.db.repository import DatabaseUserRepository
from app.models.person import Person, Donor, Vendor, Victim


class UserService:
    """Encapsulates user business logic.
    
    Demonstrates:
    - Abstraction: hides repository complexity
    - Single Responsibility: handles user business rules
    - Dependency Injection: accepts repository
    """

    def __init__(self, db: Session):
        self._repository = DatabaseUserRepository(db)

    def create_user(self, person: Person) -> dict:
        """Create a user with business logic validation."""
        # Business rule: ensure role is valid
        if person.get_role() not in ["donor", "vendor", "victim"]:
            raise ValueError("Invalid role")
        
        db_model = self._repository.add_user(person)
        return self._format_user(db_model)

    def get_user(self, uid: str) -> Optional[dict]:
        """Retrieve a user."""
        user = self._repository.get_user(uid)
        if not user:
            return None
        return self._format_user(user)

    def update_user(self, uid: str, name: Optional[str] = None, email: Optional[str] = None) -> Optional[dict]:
        """Update a user with validation."""
        if name and not name.strip():
            raise ValueError("Name cannot be empty")
        
        user = self._repository.update_user(uid, name=name, email=email)
        if not user:
            return None
        return self._format_user(user)

    def delete_user(self, uid: str) -> bool:
        """Delete a user."""
        return self._repository.delete_user(uid)

    def list_users(self, role: Optional[str] = None) -> List[dict]:
        """List users."""
        users = self._repository.list_users(role=role)
        return [self._format_user(u) for u in users]

    def list_donors(self) -> List[dict]:
        """List all donors."""
        return self.list_users(role="donor")

    def list_vendors(self) -> List[dict]:
        """List all vendors."""
        return self.list_users(role="vendor")

    def list_victims(self) -> List[dict]:
        """List all victims."""
        return self.list_users(role="victim")

    def count_by_role(self) -> dict:
        """Count users by role."""
        all_users = self._repository.list_users()
        counts = {"donor": 0, "vendor": 0, "victim": 0}
        for user in all_users:
            counts[user.role.lower()] += 1
        return counts

    @staticmethod
    def _format_user(user) -> dict:
        """Format user for API response."""
        return {
            "uid": user.uid,
            "name": user.name,
            "email": user.email,
            "role": user.role,
        }
