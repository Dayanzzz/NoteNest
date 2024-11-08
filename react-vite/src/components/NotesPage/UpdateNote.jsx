import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { thunkUpdateNote } from '../../redux/notes';

const UpdateNote = () => {
  const { noteId } = useParams(); // Get noteId from the URL
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [note, setNote] = useState({ title: '', content: '', tags: [] }); // Initialize tags as an array
  const [error, setError] = useState(null);

  // Fetch the note details when the component mounts
  useEffect(() => {
    const fetchNote = async () => {
      try {
        console.log('Fetching note with ID:', noteId); // Debugging log
        const response = await fetch(`/api/notes/${noteId}`);
        if (response.ok) {
          const data = await response.json();
          setNote(data);  // Set the full note data
        } else {
          console.error('Failed to fetch note data');
          setError('Failed to fetch note data');
        }
      } catch (error) {
        console.error('Error fetching note:', error);
        setError('Error fetching note');
      }
    };

    fetchNote();
  }, [noteId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the updated note object
    const updatedNote = {
      title: note.title,
      content: note.content,
      tags: note.tags.join(', ') // Convert array of tags to a string
    };

    try {
      const response = await fetch(`/api/notes/${noteId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedNote)
      });

      if (response.ok) {
        navigate(`/notes/${noteId}`); // Redirect to the updated note's page
      } else {
        const result = await response.json();
        setError(result.error || 'Something went wrong');
      }
    } catch (err) {
      setError('Error updating note');
      console.error(err);
    }
  };

  return (
    <div className="update-note-container">
      <h1>Edit Note</h1>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={note.title}
            onChange={(e) => setNote({ ...note, title: e.target.value })} // Update title in the note state
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            value={note.content}
            onChange={(e) => setNote({ ...note, content: e.target.value })} // Update content in the note state
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="tags">Tags (comma separated):</label>
          <input
            type="text"
            id="tags"
            value={note.tags.join(', ')}  // Convert tags array to a comma-separated string
            onChange={(e) => setNote({ ...note, tags: e.target.value.split(',').map(tag => tag.trim()) })}  // Convert input to array of tags
          />
        </div>
        <button type="submit">Update Note</button>
      </form>
    </div>
  );
};

export default UpdateNote;
