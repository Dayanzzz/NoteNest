import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAllTags,
  createTagThunk,
  deleteTagThunk,
  assignTagToNoteThunk,
  removeTagFromNoteThunk,
  fetchTagsForNoteThunk,
  setTagsForNote, 
} from '../../redux/tags';
import { thunkFetchNotes } from '../../redux/notes';
import { Plus, Trash2 } from 'lucide-react';
import './tags.css';
import Sidebar from '../Sidebar/Sidebar'; 

const Tags = ({ noteId }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const user = useSelector(state => state.session.user);
  const allTags = useSelector(state => state.tags.tags);
  const tagsForNote = useSelector(state => state.tags.tagsForNote[noteId] || []);
  const allNotes = useSelector(state => state.notes.notes);
  const [newTagName, setNewTagName] = useState('');
  const [selectedNoteId, setSelectedNoteId] = useState('');

  const isAuthenticated = !!user;

  useEffect(() => {
    const loadTagsAndNotes = async () => {
      if (isAuthenticated) {
        await dispatch(fetchAllTags());
        await dispatch(thunkFetchNotes()); // Fetch all notes for dropdown
        if (noteId) {
          await dispatch(fetchTagsForNoteThunk(noteId));
        }
      }
      setLoading(false);
    };
    loadTagsAndNotes();
  }, [dispatch, noteId, isAuthenticated]);

  const handleAddTag = async () => {
    if (newTagName.trim()) {
      const newTag = await dispatch(createTagThunk(newTagName)); // Create the tag
      if (selectedNoteId || noteId) {
        const noteToLink = selectedNoteId || noteId;
        await dispatch(assignTagToNoteThunk(noteToLink, newTag.id)); // Assign it to the note

        // Update the state for the note and refresh tags for the note
        dispatch(setTagsForNote(noteToLink, [...tagsForNote, { id: newTag.id, name: newTag.name }]));
      }
      setNewTagName(''); // Clear input after creation
    }
  };

  const handleAssignTagToNote = async (tagId) => {
    if (noteId) {
      await dispatch(assignTagToNoteThunk(noteId, tagId)); // Assign tag to the note

      // Update the tags for the note immediately
      const tag = allTags.find(tag => tag.id === tagId);
      dispatch(setTagsForNote(noteId, [...tagsForNote, tag])); // Add the tag to the note's tags
    }
  };

  const handleDeleteTag = async (tagId) => {
    await dispatch(deleteTagThunk(tagId));
  };

  const handleRemoveTagFromNote = async (tagId) => {
    if (noteId) {
      await dispatch(removeTagFromNoteThunk(noteId, tagId));
    }
  };

  if (loading) {
    return <div>Loading tags...</div>;
  }

  if (!isAuthenticated) {
    return <div>Please log in to manage tags.</div>;
  }

  return (
    <div className="Tags-wrapper">
      <Sidebar />
      <div className="tags-container">
        <h2>Tags</h2>
        <div className="tag-create">
          <input
            type="text"
            value={newTagName}
            onChange={(e) => setNewTagName(e.target.value)}
            placeholder="New tag name"
            maxLength={50}
          />
          <select value={selectedNoteId} onChange={(e) => setSelectedNoteId(e.target.value)}>
            <option value="">Select Note to Link</option>
            {allNotes.map(note => (
              <option key={note.id} value={note.id}>{note.title}</option>
            ))}
          </select>
          <button onClick={handleAddTag} className="btn-primary">
            <Plus className="icon-small" /> Add Tag
          </button>
        </div>
        <div className="tags-list">
          {allTags.map((tag) => (
            <div key={tag.id} className="tag-item">
              <span>{tag.name}</span>
              <button onClick={() => handleDeleteTag(tag.id)} className="btn-icon">
                <Trash2 className="icon-small" />
              </button>
              {tagsForNote.includes(tag.id) ? (
                <button onClick={() => handleRemoveTagFromNote(tag.id)} className="btn-secondary">
                  Remove from Note
                </button>
              ) : (
                <button onClick={() => handleAssignTagToNote(tag.id)} className="btn-secondary">
                  Assign to Note
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tags;



// import { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { thunkFetchNotes, thunkUpdateNote } from '../../redux/notes';
// import Sidebar from '../Sidebar/Sidebar';
// import './UpdateNote.css';

// const UpdateNote = () => {
//   const { noteId } = useParams();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
  
//   const [note, setNote] = useState({ title: '', content: '', tags: [] });
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchNote = async () => {
//       try {
//         console.log('Fetching note with ID:', noteId);
//         const response = await fetch(`/api/notes/${noteId}`);
//         if (response.ok) {
//           const data = await response.json();
//           setNote(data);  // Set the full note data
//         } else {
//           console.error('Failed to fetch note data');
//           setError('Failed to fetch note data');
//         }
//       } catch (error) {
//         console.error('Error fetching note:', error);
//         setError('Error fetching note');
//       }
//     };

//     fetchNote();
//   }, [noteId]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const tagsArray = Array.isArray(note.tags)
//       ? note.tags
//       : note.tags.split(',').map((tag) => tag.trim());

//     const updatedNote = {
//       title: note.title,
//       content: note.content,
//       tags: tagsArray
//     };
   
//     try {
//       const response = await fetch(`/api/notes/${noteId}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(updatedNote)
//       });

//       if (response.ok) {
//         const updatedData = await response.json();
//         dispatch(thunkUpdateNote(noteId, updatedData));
//         dispatch(thunkFetchNotes());
//         alert("Note updated successfully");
//         navigate(`/notes/`);
//       } else {
//         const result = await response.json();
//         setError(result.error || 'Something went wrong');
//       }
//     } catch (err) {
//       setError('Error updating note');
//       console.error(err);
//     }
//   };

//   const handleCancel = () => {
//     navigate('/notes');
//   };

//   return (
//     <div className="Update-Wrapper">
//       <Sidebar />
//       <div className="update-note-container">
//         <h1>Edit Note</h1>
//         {error && <p className="error">{error}</p>}
//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label htmlFor="title">Title:</label>
//             <input
//               type="text"
//               id="title"
//               value={note.title}
//               onChange={(e) => setNote({ ...note, title: e.target.value })}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="content">Content:</label>
//             <textarea
//               id="content"
//               value={note.content}
//               onChange={(e) => setNote({ ...note, content: e.target.value })}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="tags">Tags (comma separated):</label>
//             <input
//               type="text"
//               id="tags"
//               value={note.tags.join(', ')}  // This ensures the tags are joined by commas
//               onChange={(e) => setNote({ ...note, tags: e.target.value.split(',').map(tag => tag.trim()) })}
//             />
//           </div>
//           <div className="updatenotebtn">
//             <button className="updateSubmit" type="submit">Update Note</button>
//             <button className="updateCancel" type="button" onClick={handleCancel}>Cancel</button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default UpdateNote;


// import { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   fetchAllTags,
//   createTagThunk,
//   deleteTagThunk,
//   assignTagToNoteThunk,
//   removeTagFromNoteThunk,
//   fetchTagsForNoteThunk,
// } from '../../redux/tags';
// import { thunkFetchNotes } from '../../redux/notes';
// import { Plus, Trash2 } from 'lucide-react';
// import './tags.css';

// const Tags = ({ noteId }) => {
//   const dispatch = useDispatch();
//   const [loading, setLoading] = useState(true);
//   const user = useSelector(state => state.session.user);
//   const allTags = useSelector(state => state.tags.tags);
//   const tagsForNote = useSelector(state => state.tags.tagsForNote[noteId] || []);
//   const allNotes = useSelector(state => state.notes.notes);
//   const [newTagName, setNewTagName] = useState('');
//   const [selectedNoteId, setSelectedNoteId] = useState('');

//   const isAuthenticated = !!user;

//   useEffect(() => {
//     const loadTagsAndNotes = async () => {
//       if (isAuthenticated) {
//         await dispatch(fetchAllTags());
//         await dispatch(thunkFetchNotes()); // Fetch all notes for dropdown
//         if (noteId) {
//           await dispatch(fetchTagsForNoteThunk(noteId));
//         }
//       }
//       setLoading(false);
//     };
//     loadTagsAndNotes();
//   }, [dispatch, noteId, isAuthenticated]);

//   const handleAddTag = async () => {
//     if (newTagName.trim()) {
//       const newTag = await dispatch(createTagThunk(newTagName));
//       if (selectedNoteId) {
//         await dispatch(assignTagToNoteThunk(selectedNoteId, newTag.id));
//         setSelectedNoteId('');
//       }
//       setNewTagName('');
//     }
//   };

//   const handleDeleteTag = async (tagId) => {
//     await dispatch(deleteTagThunk(tagId));
//   };

//   const handleAssignTagToNote = async (tagId) => {
//     if (noteId) {
//       await dispatch(assignTagToNoteThunk(noteId, tagId));
//     }
//   };

//   const handleRemoveTagFromNote = async (tagId) => {
//     if (noteId) {
//       await dispatch(removeTagFromNoteThunk(noteId, tagId));
//     }
//   };

//   if (loading) {
//     return <div>Loading tags...</div>;
//   }

//   if (!isAuthenticated) {
//     return <div>Please log in to manage tags.</div>;
//   }

//   return (
//     <div className="tags-container">
//       <h2>Tags</h2>
//       <div className="tag-create">
//         <input
//           type="text"
//           value={newTagName}
//           onChange={(e) => setNewTagName(e.target.value)}
//           placeholder="New tag name"
//           maxLength={50}
//         />
//         <select value={selectedNoteId} onChange={(e) => setSelectedNoteId(e.target.value)}>
//           <option value="">Select Note to Link</option>
//           {allNotes.map(note => (
//             <option key={note.id} value={note.id}>{note.title}</option>
//           ))}
//         </select>
//         <button onClick={handleAddTag} className="btn-primary">
//           <Plus className="icon-small" /> Add Tag
//         </button>
//       </div>
//       <div className="tags-list">
//         {allTags.map((tag) => (
//           <div key={tag.id} className="tag-item">
//             <span>{tag.name}</span>
//             <button onClick={() => handleDeleteTag(tag.id)} className="btn-icon">
//               <Trash2 className="icon-small" />
//             </button>
//             {tagsForNote.includes(tag.id) ? (
//               <button onClick={() => handleRemoveTagFromNote(tag.id)} className="btn-secondary">
//                 Remove from Note
//               </button>
//             ) : (
//               <button onClick={() => handleAssignTagToNote(tag.id)} className="btn-secondary">
//                 Assign to Note
//               </button>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Tags;

