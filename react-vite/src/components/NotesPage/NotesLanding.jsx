
import './NotesPage.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkFetchNotes, thunkDeleteNote } from '../../redux/notes';
import Sidebar from '../Sidebar/Sidebar';
import { useNavigate } from 'react-router-dom';


  function NotesPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate(); 
    const notes = useSelector((state) => state.notes.notes);
  

    useEffect(() => {
      dispatch(thunkFetchNotes());
    }, [dispatch]);

  const handleEdit = (noteId) => {
    navigate(`/notes/${noteId}`);
 
  };


  const handleDelete = (noteId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this note?'); 
    if (confirmDelete) {
      dispatch(thunkDeleteNote(noteId));  
    }
  };

  return (
    <div className="page-wrapper">
      <Sidebar />

      <div className="right">
      <div><h1>Notes</h1></div>
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
    </div>
  );
}

export default NotesPage;