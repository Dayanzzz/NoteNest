import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { thunkFetchNotes, thunkUpdateNote } from '../../redux/notes';
import Sidebar from '../Sidebar/Sidebar';
import './UpdateNote.css'

const UpdateNote = () => {
  const { noteId } = useParams(); 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [note, setNote] = useState({ title: '', content: '', tags: [] }); 
  const [error, setError] = useState(null);

  
  useEffect(() => {
    const fetchNote = async () => {
      try {
        console.log('Fetching note with ID:', noteId); 
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

    const tagsArray = Array.isArray(note.tags) 
    ? note.tags 
    : note.tags.split(',').map((tag) => tag.trim());

    const updatedNote = {
      title: note.title,
      content: note.content,
      tags: tagsArray 
    };

    try {
      const response = await fetch(`/api/notes/${noteId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedNote)
      });

      if (response.ok) {
      const updatedData = await response.json();
      dispatch(thunkUpdateNote(noteId, updatedData));
      dispatch(thunkFetchNotes());
      alert("Note updated successfully");
      navigate(`/notes/`); 
      } else {
        const result = await response.json();
        setError(result.error || 'Something went wrong');
      }
    } catch (err) {
      setError('Error updating note');
      console.error(err);
    }
  };

  const handleCancel = () => {
    navigate('/notes'); 
  };

  return (
    <div className="Update-Wrapper">
        <Sidebar/>
    
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
            onChange={(e) => setNote({ ...note, title: e.target.value })} 
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            value={note.content}
            onChange={(e) => setNote({ ...note, content: e.target.value })} 
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="tags">Tags (comma separated):</label>
          <input
            type="text"
            id="tags"
            value={note.tags.join(', ')}  
            onChange={(e) => setNote({ ...note, tags: e.target.value.split(',').map(tag => tag.trim()) })}  
          />
        </div>
        <div className="updatenotebtn">
        <button className="updateSubmit"type="submit">Update Note</button>
        <button className = "updateCancel" type="button" onClick={handleCancel} >Cancel</button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default UpdateNote;
