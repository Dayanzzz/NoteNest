
import './NotesPage.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkFetchNotes, thunkDeleteNote } from '../../redux/notes';
import Sidebar from '../Sidebar/Sidebar';
// function NotesPage() {
//   const [notes, setNotes] = useState([]);

  // useEffect(() => {
  //   fetch('http://localhost:5173/api/notes')
  //     .then((response) => response.json())
  //     .then((data) => setNotes(data))
  //     .catch((error) => console.error('Error:', error));
  // }, []); 
  function NotesPage() {
    const dispatch = useDispatch();
    const notes = useSelector((state) => state.notes.notes);
  

    useEffect(() => {
      dispatch(thunkFetchNotes());
    }, [dispatch]);

  const handleEdit = (noteId) => {
    alert(`Edit note with ID: ${noteId}`);
 
  };


  const handleDelete = (noteId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this note?'); // Confirm delete
    if (confirmDelete) {
      dispatch(thunkDeleteNote(noteId));  // Dispatch the delete thunk action
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