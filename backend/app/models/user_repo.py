from typing import Dict, Optional

from .person import Person


class UserRepository:
    """Simple in-memory repository demonstrating encapsulation of storage.

    The internal storage `_users` is private to the repository.
    """

    def __init__(self):
        self._users: Dict[str, Person] = {}

    def add_user(self, user: Person) -> None:
        if user.uid in self._users:
            raise KeyError("User already exists")
        self._users[user.uid] = user

    def get_user(self, uid: str) -> Optional[Person]:
        return self._users.get(uid)

    def update_user(self, uid: str, **kwargs) -> Optional[Person]:
        user = self._users.get(uid)
        if not user:
            return None
        # allow updating name and email for demo
        if "name" in kwargs:
            user.name = kwargs["name"]
        if "email" in kwargs:
            user._email = kwargs["email"]
        return user

    def delete_user(self, uid: str) -> bool:
        if uid in self._users:
            del self._users[uid]
            return True
        return False

    def list_users(self):
        return list(self._users.values())
