ReliefConnect Python Backend

This FastAPI backend demonstrates OOP concepts (encapsulation, abstraction, inheritance, polymorphism) with SQLite database for persistent, dynamic data storage.

Architecture

- **Models** (`app/models/`): Abstract `Person` class and concrete subclasses (`Donor`, `Vendor`, `Victim`) demonstrating inheritance and polymorphism.
- **Database** (`app/db/`): SQLAlchemy ORM models, repository pattern, and session management.
- **Services** (`app/services/`): `AuthService` (Firebase token verification) and `UserService` (business logic encapsulation).
- **Routes** (`app/main.py`): FastAPI endpoints using dependency injection for database sessions.

Setup

1. Create a Python virtual environment and install dependencies:

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

2. Initialize the database with sample data (optional):

```powershell
python init_db.py
```

3. Set Firebase credentials (if using token verification):

```powershell
$env:GOOGLE_APPLICATION_CREDENTIALS = 'C:\path\to\serviceAccount.json'
```

Run

```powershell
uvicorn app.main:app --reload --port 8000
```

The server starts at `http://localhost:8000`. OpenAPI docs available at `http://localhost:8000/docs`.

API Endpoints

**Token Verification:**
- `POST /verify-token` - Verify Firebase ID token

**User Management (CRUD):**
- `POST /users` - Create a user (donor/vendor/victim)
- `GET /users` - List users (optionally filter by role or paginate)
- `GET /users/{uid}` - Retrieve a user
- `PUT /users/{uid}` - Update a user
- `DELETE /users/{uid}` - Delete a user

Example: Create a Donor

```bash
curl -X POST http://localhost:8000/users \
  -H "Content-Type: application/json" \
  -d '{"uid": "user123", "name": "John Doe", "email": "john@example.com", "role": "donor"}'
```

Example: List all vendors

```bash
curl http://localhost:8000/users?role=vendor
```

OOP Concepts Demonstrated

- **Encapsulation**: Private attributes (e.g., `_uid`, `_name` in `Person`) exposed via properties. Repository encapsulates storage.
- **Abstraction**: Abstract base class `Person` with subclasses providing concrete implementations. Service layer hides repository complexity.
- **Inheritance**: `Donor`, `Vendor`, `Victim` inherit from `Person`.
- **Polymorphism**: Each subclass implements `get_role()` differently; repository works with any `Person` subclass.

Database

SQLite database file: `charity.db` (created on first run in the backend root).

To reset the database:
```powershell
Remove-Item charity.db
python init_db.py
```

Notes

- Demo uses in-memory SQLite for simplicity. For production, migrate to PostgreSQL or MySQL.
- The `PersonFactory` class demonstrates the Factory pattern for creating domain objects from database models.
