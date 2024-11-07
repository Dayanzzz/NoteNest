from .db import db
from datetime import datetime
from .user import User


note_tags = db.Table('note_tags',
    db.Column('note_id', db.Integer, db.ForeignKey('notes.id'), primary_key=True),
    db.Column('tag_id', db.Integer, db.ForeignKey('tags.id'), primary_key=True)
)

class Notebook(db.Model):
    __tablename__ = 'notebooks'

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    name = db.Column(db.String(80), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    owner = db.relationship('User', back_populates='notebooks')
    notes = db.relationship('Note', back_populates='notebook')

    def __repr__(self):
        return f"<Notebook(id={self.id}, name={self.name})>"

    def to_dict(self):
        return {
            'id': self.id,
            'owner_id': self.owner_id,
            'name': self.name,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'notes': [note.to_dict() for note in self.notes] 
        }

class Note(db.Model):
    __tablename__ = 'notes'

    id = db.Column(db.Integer, primary_key=True)
    notebook_id = db.Column(db.Integer, db.ForeignKey('notebooks.id'), nullable=False)
    title = db.Column(db.String(80), nullable=False)
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    notebook = db.relationship('Notebook', back_populates='notes')
    tags = db.relationship('Tag', secondary=note_tags, back_populates='notes')

    def __repr__(self):
        return f"<Note(id={self.id}, title={self.title})>"

    def to_dict(self):
        return {
            'id': self.id,
            'notebook_id': self.notebook_id,
            'title': self.title,
            'content': self.content,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'tags': [tag.to_dict() for tag in self.tags] 
        }

class Tag(db.Model):
    __tablename__ = 'tags'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True, nullable=False)

    notes = db.relationship('Note', secondary=note_tags, back_populates='tags')

    def __repr__(self):
        return f"<Tag(id={self.id}, name={self.name})>"

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name
        }

class Task(db.Model):
    __tablename__ = 'tasks'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    description = db.Column(db.Text, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    user = db.relationship('User', back_populates='tasks')

    def __repr__(self):
        return f"<Task(id={self.id}, name={self.name})>"

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'user_id': self.user_id,
            'user': self.user.to_dict()  
        }
