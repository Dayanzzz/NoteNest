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


# POST: Create a new note
@note_routes.route('', methods=['POST'])
@login_required
def create_note():
    data = request.get_json()
    
    
    if not data.get('title') or not data.get('content'):
        return jsonify({'error': 'Title and content are required'}), 400
    
    notebook_id = data.get('notebook_id')
    
    
    notebook = Notebook.query.filter_by(id=notebook_id, owner_id=current_user.id).first()
    if not notebook:
        return jsonify({'error': 'Invalid notebook or notebook not found'}), 404
    
    
    new_note = Note(
        notebook_id=notebook_id,
        title=data['title'],
        content=data['content'],
        
    )
    
   
    if data.get('tags'):
        tags = []
        for tag_name in data['tags']:
            tag = Tag.query.filter_by(name=tag_name).first()  

            if tag:  
                tags.append(tag)
            else:
                
                new_tag = Tag(name=tag_name)
                db.session.add(new_tag)
                tags.append(new_tag)

       
        new_note.tags.extend(tags)

    db.session.add(new_note)
    db.session.commit()

    return jsonify({
        'id': new_note.id,
        'title': new_note.title,
        'content': new_note.content,
        'created_at': new_note.created_at,
        'updated_at': new_note.updated_at,
        'tags': [tag.name for tag in new_note.tags]
    }), 201

# PUT: Update an existing note
@note_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_note(id):
    note = Note.query.filter_by(id=id, owner_id=current_user.id).first_or_404()
    
    data = request.get_json()
    
    # Update note fields if they are provided
    if data.get('title'):
        note.title = data['title']
    if data.get('content'):
        note.content = data['content']
    
    # Update tags if they are provided
    if data.get('tags'):
        note.tags = []  # Clear existing tags before adding new ones
        tags = [Tag.query.filter_by(name=tag).first() for tag in data['tags']]
        note.tags.extend(tags)

    db.session.commit()

    return jsonify({
        'id': note.id,
        'title': note.title,
        'content': note.content,
        'created_at': note.created_at,
        'updated_at': note.updated_at,
        'tags': [tag.name for tag in note.tags]
    })

# DELETE: Delete a note by ID
@note_routes.route('/<int:note_id>', methods=['DELETE'])
@login_required
def delete_note(note_id):
    try:
       
        note = Note.query.get(note_id)
        
        if not note:
            return jsonify({'message': 'Note not found'}), 404
        
       
        notebook = Notebook.query.filter_by(id=note.notebook_id).first()

        if not notebook or notebook.owner_id != current_user.id:
            return jsonify({'message': 'You do not have permission to delete this note'}), 403

        
        db.session.delete(note)
        db.session.commit()

        return jsonify({'message': 'Note deleted successfully'}), 200

    except Exception as e:
       
        print(f"Error deleting note: {e}")
        db.session.rollback() 
        return jsonify({'message': 'Internal server error'}), 500