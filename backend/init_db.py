"""Database initialization script with sample data."""

from app.db.config import SessionLocal, Base, engine
from app.db.models import PersonModel
from app.models.person import Donor, Vendor, Victim


def init_db():
    """Create tables and populate with sample data."""
    # Create all tables
    Base.metadata.create_all(bind=engine)
    
    db = SessionLocal()
    
    try:
        # Check if data already exists
        if db.query(PersonModel).count() > 0:
            print("Database already populated. Skipping...")
            return
        
        # Create sample users
        sample_users = [
            {"uid": "donor1", "name": "Alice Johnson", "email": "alice@example.com", "role": "donor"},
            {"uid": "donor2", "name": "Bob Smith", "email": "bob@example.com", "role": "donor"},
            {"uid": "vendor1", "name": "Charlie's Supplies", "email": "charlie@supplies.com", "role": "vendor"},
            {"uid": "vendor2", "name": "Diana's Goods", "email": "diana@goods.com", "role": "vendor"},
            {"uid": "victim1", "name": "Eve Brown", "email": "eve@example.com", "role": "victim"},
            {"uid": "victim2", "name": "Frank Wilson", "email": "frank@example.com", "role": "victim"},
        ]
        
        for user_data in sample_users:
            user = PersonModel(**user_data)
            db.add(user)
        
        db.commit()
        print(f"Database initialized with {len(sample_users)} sample users.")
        
    except Exception as e:
        db.rollback()
        print(f"Error initializing database: {e}")
    finally:
        db.close()


if __name__ == "__main__":
    init_db()
