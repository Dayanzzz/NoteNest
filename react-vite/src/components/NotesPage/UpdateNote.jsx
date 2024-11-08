import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateNote = () => {
  // Extract the noteId from the URL
  const { noteId } = useParams();
  const navigate = useNavigate();

  // State to hold note data
  const [note, setNote] = useState({
    title: '',
    content: '',
    tags: []
  });

  useEffect(() => {
    // Fetch the note data by noteId (this is just an example)
    fetch(`/api/notes/${noteId}`)
      .then((response) => response.json())
      .then((data) => setNote(data))
      .catch((error) => console.error('Error fetching note:', error));
  }, [noteId]);

  const handleUpdate = (e) => {
    e.preventDefault();

    // Send a PUT request to update the note
    fetch(`/api/notes/${noteId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(note),
    })
      .then((response) => response.json())
      .then((updatedNote) => {
        // Redirect back to the notes page after successful update
        navigate('/notes');
      })
      .catch((error) => console.error('Error updating note:', error));
  };

  return (
    <div>
      <h1>Update Note</h1>
      <form onSubmit={handleUpdate}>
        <div>
          <label>Title</label>
          <input
            type="text"
            value={note.title}
            onChange={(e) => setNote({ ...note, title: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Content</label>
          <textarea
            value={note.content}
            onChange={(e) => setNote({ ...note, content: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Tags</label>
          <input
            type="text"
            value={note.tags.join(', ')}
            onChange={(e) =>
              setNote({ ...note, tags: e.target.value.split(', ') })
            }
          />
        </div>
        <button type="submit">Update Note</button>
      </form>
    </div>
  );
};

export default UpdateNote;
