// import './NotesPage.css'
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";  // Import useDispatch and useSelector
// import { thunkFetchNotes, thunkAddNote, thunkDeleteNote, thunkUpdateNote } from '../../redux/notes'; // Thunks for actions

// const NotesPage = () => {
//   const dispatch = useDispatch();  // Initialize dispatch
//   const notes = useSelector((state) => state.notes.notes);  // Get the notes from the Redux store

//   // Fetch notes when component mounts
//   useEffect(() => {
//     dispatch(thunkFetchNotes());
//   }, [dispatch]);

//   // Handle adding a new note
//   const handleAddNote = () => {
//     const newNote = { title: "New Note", content: "This is a new note." };
//     dispatch(thunkAddNote(newNote));  // Dispatch action to add note
//   };

//   // Handle editing a note
//   const handleEdit = (noteId) => {
//     dispatch(thunkUpdateNote(noteId));  // Dispatch action to edit note
//   };

//   // Handle deleting a note
//   const handleDelete = (noteId) => {
//     dispatch(thunkDeleteNote(noteId));  // Dispatch action to delete note
//   };

//   return (
//     <div>
//       <h1>Notes</h1>
//       <button onClick={handleAddNote}>Add Note</button> 
//       <div className="grid-container">
//         {notes.length === 0 ? (
//           <p>No notes available</p>  
//         ) : (
//           notes.map((note) => (
//             <div key={note.id} className="note-card">
//               <h2>{note.title}</h2>
//               <p>{note.content.substring(0, 100)}...</p> 
//               <div className="note-actions">
//                 <button onClick={() => handleEdit(note.id)}>Edit</button>
//                 <button onClick={() => handleDelete(note.id)}>Delete</button>
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default NotesPage;

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
