import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAllTags,
  createTagThunk,
  deleteTagThunk,
  assignTagToNoteThunk,
  removeTagFromNoteThunk,
  fetchTagsForNoteThunk
} from '../../redux/tags';
import { Plus, Trash2 } from 'lucide-react';
// import './Tags.css';

const Tags = ({ noteId }) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const user = useSelector(state => state.session.user);
    const allTags = useSelector(state => state.tags.tags);
    const tagsForNote = useSelector(state => state.tags.tagsForNote[noteId] || []);
    const [newTagName, setNewTagName] = useState('');

    const isAuthenticated = !!user;

    useEffect(() => {
      const loadTags = async () => {
        if (isAuthenticated) {
          await dispatch(fetchAllTags());
          if (noteId) {
            await dispatch(fetchTagsForNoteThunk(noteId));
          }
        }
        setLoading(false);
      };
      loadTags();
    }, [dispatch, noteId, isAuthenticated]);

    const handleAddTag = async () => {
      if (newTagName.trim()) {
        await dispatch(createTagThunk(newTagName));
        setNewTagName('');
      }
    };

    const handleDeleteTag = async (tagId) => {
      await dispatch(deleteTagThunk(tagId));
    };

    const handleAssignTagToNote = async (tagId) => {
      if (noteId) {
        await dispatch(assignTagToNoteThunk(noteId, tagId));
      }
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
          <button onClick={handleAddTag} className="btn-primary">
            <Plus className="icon-small" /> Add Tag
          </button>
        </div>

        <div className="all-tags">
          <h3>All Tags</h3>
          <ul>
            {allTags.map(tag => (
              <li key={tag.id} className="tag-item">
                <span>{tag.name}</span>
                <button onClick={() => handleDeleteTag(tag.id)} className="btn-icon delete">
                  <Trash2 className="icon-small" />
                </button>
                {noteId && !tagsForNote.includes(tag.id) && (
                  <button onClick={() => handleAssignTagToNote(tag.id)} className="btn-assign">
                    Assign to Note
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>

        {noteId && (
          <div className="note-tags">
            <h3>Tags for this Note</h3>
            <ul>
              {tagsForNote.map(tagId => {
                const tag = allTags.find(tag => tag.id === tagId);
                return (
                  <li key={tagId} className="note-tag-item">
                    <span>{tag?.name || 'Unknown Tag'}</span>
                    <button onClick={() => handleRemoveTagFromNote(tagId)} className="btn-icon delete">
                      <Trash2 className="icon-small" />
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    );
};

export default Tags;


// import { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   fetchAllTags,
//   createTagThunk,
//   deleteTagThunk,
//   assignTagToNoteThunk,
//   removeTagFromNoteThunk,
//   fetchTagsForNoteThunk
// } from '../../redux/tags';
// import { Plus, Trash2 } from 'lucide-react';
// import './tags.css';

// const Tags = ({ noteId }) => {
//   const dispatch = useDispatch();
//   const [loading, setLoading] = useState(true);
//   const allTags = useSelector(state => state.tags.allTags);   //? Object.values(state.tags.allTags) : []);
//   const tagsForNote = useSelector(state => state.tags.tagsForNote[noteId] || []);
//   const [newTagName, setNewTagName] = useState('');

//   useEffect(() => {
//     const loadTags = async () => {
//       await dispatch(fetchAllTags());
//       setLoading(false); // Set loading to false once fetch is complete
//       if (noteId) {
//         await dispatch(fetchTagsForNoteThunk(noteId));
//       }
//     };
//     loadTags();
//   }, [dispatch, noteId]);

//   const handleAddTag = async () => {
//     if (newTagName.trim()) {
//       await dispatch(createTagThunk(newTagName));
//       setNewTagName('');
//     }
//   };

//   const handleDeleteTag = async (tagId) => {
//     await dispatch(deleteTagThunk(tagId));
//   };

//   const handleAssignTagToNote = async (tagId) => {
//     await dispatch(assignTagToNoteThunk(noteId, tagId));
//   };

//   const handleRemoveTagFromNote = async (tagId) => {
//     await dispatch(removeTagFromNoteThunk(noteId, tagId));
//   };

//   if (loading) {
//     return <div>Loading tags...</div>;
//   }

//   return (
//     <div className="tags-container">
//       <h2>Tags</h2>

//       {/* Tag Creation */}
//       <div className="tag-create">
//         <input
//           type="text"
//           value={newTagName}
//           onChange={(e) => setNewTagName(e.target.value)}
//           placeholder="New tag name"
//           maxLength={50}
//         />
//         <button onClick={handleAddTag} className="btn-primary">
//           <Plus className="icon-small" /> Add Tag
//         </button>
//       </div>

//       {/* Tag List */}
//       <div className="all-tags">
//         <h3>All Tags</h3>
//         <ul>
//           {allTags.map(tag => (
//             <li key={tag.id} className="tag-item">
//               <span>{tag.name}</span>
//               <button onClick={() => handleDeleteTag(tag.id)} className="btn-icon delete">
//                 <Trash2 className="icon-small" />
//               </button>
//               {noteId && !tagsForNote.includes(tag.id) && (
//                 <button onClick={() => handleAssignTagToNote(tag.id)} className="btn-assign">
//                   Assign to Note
//                 </button>
//               )}
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Tags Associated with the Current Note */}
//       {noteId && (
//         <div className="note-tags">
//           <h3>Tags for this Note</h3>
//           <ul>
//             {tagsForNote.map(tagId => {
//               const tag = allTags.find(tag => tag.id === tagId);
//               return (
//                 <li key={tagId} className="note-tag-item">
//                   <span>{tag?.name || 'Unknown Tag'}</span>
//                   <button onClick={() => handleRemoveTagFromNote(tagId)} className="btn-icon delete">
//                     <Trash2 className="icon-small" />
//                   </button>
//                 </li>
//               );
//             })}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Tags;
