from app import app, db
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime


class Agent(db.Model):
    __tablename__ = 'agents'

    agent_id = db.Column(db.String(50), unique=True, nullable=False, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    department_id = db.Column(db.String(50), nullable=False)

    def __repr__(self):
        return f"<Agent {self.name}>"

class Ticket(db.Model):
    __tablename__ = 'tickets'

    ticket_id = db.Column(db.String(50), unique=True, nullable=False, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=True)
    label = db.Column(db.String(50), nullable=True)
    assigned_to = db.Column(db.String(100), nullable=True)
    status = db.Column(db.String(50), nullable=False)
    client_name = db.Column(db.String(100), nullable=False)
    client_contact = db.Column(db.String(100), nullable=False)
    ts = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)

    def __repr__(self):
        return f"<Ticket {self.ticket_id}>"

class Department(db.Model):
    __tablename__ = 'departments'

    department_id = db.Column(db.String(50), unique=True, nullable=False, primary_key=True)
    name = db.Column(db.String(100), nullable=False)

    def __repr__(self):
        return f"<Department {self.name}>"

# Create tables
with app.app_context():
    db.create_all()
