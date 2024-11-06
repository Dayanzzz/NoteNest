from app.models import db, Task, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

# Adds some demo tasks, you can customize or expand these as needed
def seed_tasks():
    task1 = Task(
        name='Complete project report', 
        description='Finish and submit the final project report', 
        user_id=1,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    task2 = Task(
        name='Team meeting',
        description='Discuss project progress with the team',
        user_id=2,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    task3 = Task(
        name='Client call',
        description='Follow up with the client regarding feedback',
        user_id=3,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    db.session.add(task1)
    db.session.add(task2)
    db.session.add(task3)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the tasks table
# TRUNCATE is used in production to clear the table and reset the ID
# DELETE is used in development with sqlite3 for the same effect
def undo_tasks():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.tasks RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM tasks"))
        
    db.session.commit()
