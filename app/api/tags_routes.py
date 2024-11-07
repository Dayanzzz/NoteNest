from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from ..models import db, Tag, Note, Notebook

bp = Blueprint('tags', __name__, url_prefix='/api/tags')

@bp.route('', methods=['GET'])
@login_required
def get_tags():
    tags = Tag.query.join(Tag.notes).join(Note.notebook).filter(
        Notebook.owner_id == current_user.id
    ).distinct().all()
    return jsonify([{
        'id': tag.id,
        'name': tag.name,
        'note_count': sum(1 for note in tag.notes if note.notebook.owner_id == current_user.id)
    } for tag in tags])

@bp.route('', methods=['POST'])
@login_required
def create_tag():
    data = request.get_json()
    
    # Check if 'name' is provided in the request data
    if not data or 'name' not in data:
        return jsonify({'error': 'Tag name is required'}), 400

    existing_tag = Tag.query.filter_by(name=data['name']).first()
    if existing_tag:
        return jsonify({
            'id': existing_tag.id,
            'name': existing_tag.name,
            'note_count': len(existing_tag.notes)
        })

    # Create and save new tag
    tag = Tag(name=data['name'])
    db.session.add(tag)
    db.session.commit()
    return jsonify({
        'id': tag.id,
        'name': tag.name,
        'note_count': 0
    }), 201

@bp.route('/<int:tag_id>', methods=['DELETE'])
@login_required
def delete_tag(tag_id):
    tag = Tag.query.get_or_404(tag_id)
    
    # Remove tag only from the current user's notes
    user_notes_with_tag = [note for note in tag.notes if note.notebook.owner_id == current_user.id]
    for note in user_notes_with_tag:
        note.tags.remove(tag)

    # Delete the tag only if it's no longer associated with any notes
    if not tag.notes:
        db.session.delete(tag)

    db.session.commit()
    return jsonify({'message': 'Tag deleted successfully'})
