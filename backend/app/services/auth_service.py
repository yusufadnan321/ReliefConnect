import os
from typing import Optional

import firebase_admin
from firebase_admin import auth, credentials


class AuthService:
    """Encapsulates Firebase Admin initialization and token verification."""

    def __init__(self, cred_path: Optional[str] = None):
        self._app = None
        self._initialized = False
        self._cred_path = cred_path or os.getenv("GOOGLE_APPLICATION_CREDENTIALS")
        self._initialize()

    def _initialize(self):
        # internal helper, hidden from public API
        if self._initialized:
            return
        try:
            if self._cred_path:
                cred = credentials.Certificate(self._cred_path)
                self._app = firebase_admin.initialize_app(cred)
            else:
                # may raise if not configured in environment
                self._app = firebase_admin.initialize_app()
            self._initialized = True
        except Exception:
            # If already initialized in the process, get the existing app
            try:
                self._app = firebase_admin.get_app()
                self._initialized = True
            except Exception:
                # leave uninitialized; verification will raise helpful errors
                self._initialized = False

    def verify_id_token(self, id_token: str) -> dict:
        """Verify a Firebase ID token and return decoded claims.

        Raises an exception if verification fails.
        """
        if not id_token:
            raise ValueError("id_token must be provided")
        if not self._initialized:
            # try a best-effort initialize (useful in dev)
            self._initialize()
        return auth.verify_id_token(id_token, app=self._app)
