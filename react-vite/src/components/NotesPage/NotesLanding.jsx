
import './NotesPage.css';
import { useEffect, useState } from 'react';

function NotesPage() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5173/api/notes')
      .then((response) => response.json())
      .then((data) => setNotes(data))
      .catch((error) => console.error('Error:', error));
  }, []); 
  const handleEdit = (noteId) => {
    alert(`Edit note with ID: ${noteId}`);
 
  };


  const handleDelete = (noteId) => {
    alert(`Delete note with ID: ${noteId}`);

  };

  return (
    <div>
      <h1>Notes</h1>
      <div className="notes-grid">
      {notes.slice(0, 6).map((note) => (  
          <div className="note-card" key={note.id}>
            <h2>{note.title}</h2>
            <p>{note.content}</p>
            <p>Created on: {note.created_at}</p>
            <p>Tags: {note.tags.join(', ')}</p>

            <div className="note-buttons">
              <button onClick={() => handleEdit(note.id)} className="edit-btn">
                Edit
              </button>
              <button onClick={() => handleDelete(note.id)} className="delete-btn">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NotesPage;