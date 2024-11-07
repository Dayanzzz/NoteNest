from flask import Flask, request, jsonify

app = Flask(__name__)

# In-memory "database"
notes = []
next_id = 1

@app.route('/')
def home():
    return "Welcome to NoteNest API!"

@app.route('/notes', methods=['POST'])
def create_note():
    global next_id

    data = request.get_json()
    title = data.get('title')
    content = data.get('content')

    if not title or not content:
        return jsonify({'message': 'Title and content are required'}), 400

    new_note = {
        'id': next_id,
        'title': title,
        'content': content,
        'created_at': '2024-11-06T12:00:00Z'  # Use datetime for dynamic timestamps
    }
    notes.append(new_note)
    next_id += 1

    return jsonify(new_note), 201

@app.route('/notes', methods=['GET'])
def get_notes():
    return jsonify(notes), 200

@app.route('/notes/<int:id>', methods=['GET'])
def get_note(id):
    note = next((note for note in notes if note['id'] == id), None)
    
    if note is None:
        return jsonify({'message': 'Note not found'}), 404

    return jsonify(note), 200

@app.route('/notes/<int:id>', methods=['PUT'])
def update_note(id):
    data = request.get_json()
    title = data.get('title')
    content = data.get('content')

    note = next((note for note in notes if note['id'] == id), None)
    
    if note is None:
        return jsonify({'message': 'Note not found'}), 404

    if title:
        note['title'] = title
    if content:
        note['content'] = content

    return jsonify(note), 200

@app.route('/notes/<int:id>', methods=['DELETE'])
def delete_note(id):
    global notes
    
    note = next((note for note in notes if note['id'] == id), None)
    
    if note is None:
        return jsonify({'message': 'Note not found'}), 404

    notes = [note for note in notes if note['id'] != id]

    return jsonify({'message': 'Note deleted successfully'}), 200

if __name__ == '__main__':
    app.run(debug=True)
