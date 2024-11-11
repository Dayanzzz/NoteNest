
import './NotesPage.css'

const NotesPage = () => {
 
  const notes = [
    { id: 1, title: "Note 1", content: "This is the first note." },
    { id: 2, title: "Note 2", content: "This is the second note." },
    { id: 3, title: "Note 3", content: "This is the third note." },
    { id: 4, title: "Note 4", content: "This is the fourth note." },
    { id: 5, title: "Note 5", content: "This is the fifth note." },
    { id: 6, title: "Note 6", content: "This is the sixth note." },
  ];

 





  const handleEdit = (noteId) => {
    console.log(`Edit note with id: ${noteId}`);
  };

  const handleDelete = (noteId) => {
    console.log(`Delete note with id: ${noteId}`);
  };

  return (
    <div>
      <h1>Notes</h1>
      <div className="grid-container">
        {notes.map(note => (
          <div key={note.id} className="note-card">
            <h2>{note.title}</h2>
            <p>{note.content.substring(0, 100)}...</p> 
            <div className="note-actions">
            {/* <Link to={`/notes/${note.id}/edit`}>
            <button>Edit</button>
            </Link> */}
            <button onClick={() => handleEdit(note.id)}>Edit</button>
              <button onClick={() => handleDelete(note.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotesPage;
