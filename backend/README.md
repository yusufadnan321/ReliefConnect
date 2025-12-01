ReliefConnect Python Backend

This small FastAPI backend demonstrates OOP concepts (encapsulation, abstraction, inheritance, polymorphism) and integrates Firebase token verification.

Setup

1. Create a Python virtual environment and install dependencies:

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

2. Provide Firebase credentials by setting `GOOGLE_APPLICATION_CREDENTIALS` to your service account JSON path:

```powershell
$env:GOOGLE_APPLICATION_CREDENTIALS = 'C:\path\to\serviceAccount.json'
```

Run

```powershell
uvicorn app.main:app --reload --port 8000
```

API Endpoints

- `POST /verify-token` - verify Firebase ID token
- `POST /users` - create a user (donor/vendor/victim)
- `GET /users` - list users
- `GET /users/{uid}` - retrieve user
- `PUT /users/{uid}` - update user
- `DELETE /users/{uid}` - delete user

Notes

- This is a demo: repository uses in-memory storage. Replace `UserRepository` with a persistent implementation for production.
