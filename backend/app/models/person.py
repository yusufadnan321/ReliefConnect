from abc import ABC, abstractmethod


class Person(ABC):
    """Abstract base class demonstrating abstraction and encapsulation.

    Attributes are kept 'protected' (single underscore) and exposed
    via properties to enforce encapsulation.
    """

    def __init__(self, uid: str, name: str, email: str):
        self._uid = uid
        self._name = name
        self._email = email

    @property
    def uid(self) -> str:
        return self._uid

    @property
    def name(self) -> str:
        return self._name

    @name.setter
    def name(self, value: str):
        if not value:
            raise ValueError("name cannot be empty")
        self._name = value

    @property
    def email(self) -> str:
        return self._email

    @abstractmethod
    def get_role(self) -> str:
        """Subclasses must provide a role string. Demonstrates abstraction."""
        raise NotImplementedError


class Donor(Person):
    def get_role(self) -> str:
        return "donor"


class Vendor(Person):
    def get_role(self) -> str:
        return "vendor"


class Victim(Person):
    def get_role(self) -> str:
        return "victim"
