from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from ..models import db, Note, Notebook, Tag

note_routes = Blueprint('notes', __name__, url_prefix="/api/notes")

# GET: Fetch all notes for the current user (optionally filtered by notebook_id)
@note_routes.route('', methods=['GET'])
@login_required
def get_notes():
    notebook_id = request.args.get('notebook_id')
    if notebook_id:
        notebook = Notebook.query.filter_by(
            id=notebook_id,
            owner_id=current_user.id
        ).first_or_404()
        notes = Note.query.filter_by(notebook_id=notebook_id).all()
    else:
        notes = Note.query.join(Notebook).filter(
            Notebook.owner_id == current_user.id
        ).all()

    return jsonify([{
        'id': note.id,
        'notebook_id': note.notebook_id,
        'title': note.title,
        'content': note.content,
        'created_at': note.created_at,
        'updated_at': note.updated_at,
        'tags': [tag.name for tag in note.tags]
    } for note in notes])