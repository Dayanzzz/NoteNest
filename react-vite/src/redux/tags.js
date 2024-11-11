// Action Types
const SET_TAGS = "tags/SET_TAGS";
const ADD_TAG = "tags/ADD_TAG";
const DELETE_TAG = "tags/DELETE_TAG";
const ASSIGN_TAG_TO_NOTE = "tags/ASSIGN_TAG_TO_NOTE";
const REMOVE_TAG_FROM_NOTE = "tags/REMOVE_TAG_FROM_NOTE";
const SET_TAGS_FOR_NOTE = "tags/SET_TAGS_FOR_NOTE";

// Action Creators
export const setTags = (tags) => ({
  type: SET_TAGS,
  tags,
});

export const addTag = (tag) => ({
  type: ADD_TAG,
  tag,
});

export const deleteTag = (tagId) => ({
  type: DELETE_TAG,
  tagId,
});

export const assignTagToNote = (noteId, tagId) => ({
  type: ASSIGN_TAG_TO_NOTE,
  noteId,
  tagId,
});

export const removeTagFromNote = (noteId, tagId) => ({
  type: REMOVE_TAG_FROM_NOTE,
  noteId,
  tagId,
});

export const setTagsForNote = (noteId, tags) => ({
  type: SET_TAGS_FOR_NOTE,
  noteId,
  tags,
});

// Thunks
// export const fetchAllTags = () => async (dispatch) => {
//   const response = await fetch("/api/tags", { credentials: "include" });
//   if (response.ok) {
//     const data = await response.json();
//     dispatch(setTags(data));
//   } else {
//     console.error("Error fetching tags");
//   }
// };

export const fetchAllTags = () => async (dispatch) => {
  const response = await fetch("/api/tags", { credentials: "include" });
  if (response.ok) {
    const data = await response.json();
    dispatch(setTags(data));
  } else {
    console.error("Error fetching tags", response);
  }
};
export const createTagThunk = (name) => async (dispatch) => {
  const csrfToken = document.cookie.split('=')[1];
  const response = await fetch("/api/tags", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": csrfToken,
    },
    body: JSON.stringify({ name }),
    credentials: "include",
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(addTag(data));
  } else {
    console.error("Error creating tag", response);
  }
};
// export const createTagThunk = (tagName) => async (dispatch) => {
//   const response = await fetch("/api/tags", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ name: tagName }),
//     credentials: "include",
//   });

//   if (response.ok) {
//     const newTag = await response.json();
//     dispatch(addTag(newTag));
//   } else {
//     console.error("Error creating tag");
//   }
// };

export const deleteTagThunk = (tagId) => async (dispatch) => {
  const response = await fetch(`/api/tags/${tagId}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (response.ok) {
    dispatch(deleteTag(tagId));
  } else {
    console.error("Error deleting tag");
  }
};

export const assignTagToNoteThunk = (noteId, tagId) => async (dispatch) => {
  const response = await fetch("/api/note_tags", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ note_id: noteId, tag_id: tagId }),
    credentials: "include",
  });

  if (response.ok) {
    dispatch(assignTagToNote(noteId, tagId));
  } else {
    console.error("Error assigning tag to note");
  }
};

export const removeTagFromNoteThunk = (noteId, tagId) => async (dispatch) => {
  const response = await fetch("/api/note_tags", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ note_id: noteId, tag_id: tagId }),
    credentials: "include",
  });

  if (response.ok) {
    dispatch(removeTagFromNote(noteId, tagId));
  } else {
    console.error("Error removing tag from note");
  }
};

export const fetchTagsForNoteThunk = (noteId) => async (dispatch) => {
  const response = await fetch(`/api/tags/notes/${noteId}/tags`, {
    credentials: "include",
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(setTagsForNote(noteId, data));
  } else {
    console.error("Error fetching tags for note");
  }
};

// Initial State
const initialState = {
  tags: [],
  tagsForNote: {},
};

// Reducer
const tagsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TAGS:
      return {
        ...state,
        tags: action.tags,
      };

    case ADD_TAG:
      return {
        ...state,
        tags: [...state.tags, action.tag],
      };

    case DELETE_TAG:
      return {
        ...state,
        tags: state.tags.filter((tag) => tag.id !== action.tagId),
      };

    case ASSIGN_TAG_TO_NOTE: {
      const { noteId, tagId } = action;
      const updatedTagsForNote = state.tagsForNote[noteId]
        ? [...state.tagsForNote[noteId], tagId]
        : [tagId];
      return {
        ...state,
        tagsForNote: {
          ...state.tagsForNote,
          [noteId]: updatedTagsForNote,
        },
      };
    }

    case REMOVE_TAG_FROM_NOTE: {
      const { noteId, tagId } = action;
      const filteredTags = (state.tagsForNote[noteId] || []).filter((id) => id !== tagId);
      return {
        ...state,
        tagsForNote: {
          ...state.tagsForNote,
          [noteId]: filteredTags,
        },
      };
    }

    case SET_TAGS_FOR_NOTE:
      return {
        ...state,
        tagsForNote: {
          ...state.tagsForNote,
          [action.noteId]: action.tags.map((tag) => tag.id),
        },
      };

    default:
      return state;
  }
};

export default tagsReducer;

// react-vite/src/redux/tags.js

// // Action Types
// const SET_ALL_TAGS = "tags/SET_ALL_TAGS";
// const ADD_TAG = "tags/ADD_TAG";
// const DELETE_TAG = "tags/DELETE_TAG";
// const ASSIGN_TAG_TO_NOTE = "tags/ASSIGN_TAG_TO_NOTE";
// const REMOVE_TAG_FROM_NOTE = "tags/REMOVE_TAG_FROM_NOTE";
// const SET_TAGS_FOR_NOTE = "tags/SET_TAGS_FOR_NOTE";

// // Action Creators
// export const setAllTags = (tags) => ({
//   type: SET_ALL_TAGS,
//   payload: tags
// });

// export const addTag = (tag) => ({
//   type: ADD_TAG,
//   payload: tag
// });

// export const deleteTag = (tagId) => ({
//   type: DELETE_TAG,
//   payload: tagId
// });

// export const assignTagToNote = (noteId, tagId) => ({
//   type: ASSIGN_TAG_TO_NOTE,
//   payload: { noteId, tagId }
// });

// export const removeTagFromNote = (noteId, tagId) => ({
//   type: REMOVE_TAG_FROM_NOTE,
//   payload: { noteId, tagId }
// });

// export const setTagsForNote = (tags) => ({
//   type: SET_TAGS_FOR_NOTE,
//   payload: tags
// });

// // Thunks

// // Fetch all tags
// export const fetchAllTags = () => async (dispatch) => {
//   const response = await fetch("/api/tags", {
//     credentials: "include"
//   });
//   if (response.ok) {
//     const data = await response.json();
//     dispatch(setAllTags(data));
//   } else {
//     console.error("Error fetching tags");
//   }
// };

// // Create a new tag

// // // Fetch all tags
// // export const fetchAllTags = () => async (dispatch) => {
// //   const response = await fetch("/api/tags");
// //   if (response.ok) {
// //     const data = await response.json();
// //     dispatch(setAllTags(data));
// //   } else {
// //     console.error("Error fetching tags");
// //   }
// // };
// // //Adding tags
// // export const createTagThunk = (tagName) => async (dispatch) => {
// //   const response = await fetch("/api/tags", {
// //     method: "POST",
// //     headers: { "Content-Type": "application/json" },
// //     body: JSON.stringify({ name: tagName })
// //   });

// //   if (response.ok) {
// //     const newTag = await response.json();
// //     dispatch(addTag(newTag));
// //   } else {
// //     console.error("Error creating tag");
// //   }
// // };
// // //Deleting tags 
// // export const deleteTagThunk = (tagId) => async (dispatch) => {
// //   const response = await fetch(`/api/tags/${tagId}`, {
// //     method: "DELETE"
// //   });

// //   if (response.ok) {
// //     dispatch(deleteTag(tagId));
// //   } else {
// //     console.error("Error deleting tag");
// //   }
// // };
// // //Assigning tags from notes 
// // export const assignTagToNoteThunk = (noteId, tagId) => async (dispatch) => {
// //   const response = await fetch("/api/note_tags", {
// //     method: "POST",
// //     headers: { "Content-Type": "application/json" },
// //     body: JSON.stringify({ note_id: noteId, tag_id: tagId })
// //   });

// //   if (response.ok) {
// //     dispatch(assignTagToNote(noteId, tagId));
// //   } else {
// //     console.error("Error assigning tag to note");
// //   }
// // };
// // //Removing tags from notes 
// // export const removeTagFromNoteThunk = (noteId, tagId) => async (dispatch) => {
// //   const response = await fetch("/api/note_tags", {
// //     method: "DELETE",
// //     headers: { "Content-Type": "application/json" },
// //     body: JSON.stringify({ note_id: noteId, tag_id: tagId })
// //   });

// //   if (response.ok) {
// //     dispatch(removeTagFromNote(noteId, tagId));
// //   } else {
// //     console.error("Error removing tag from note");
// //   }
// // };
// // //Fetching tags for a specific note
// // export const fetchTagsForNoteThunk = (noteId) => async (dispatch) => {
// //   const response = await fetch(`/api/tags/notes/${noteId}/tags`);
// //   if (response.ok) {
// //     const data = await response.json();
// //     dispatch(setTagsForNote(data));
// //   } else {
// //     console.error("Error fetching tags for note");
// //   }
// // };

// // Initial State
// const initialState = {
//   allTags: [],
//   tagsForNote: {}
// };

// // Reducer
// const tagsReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case SET_ALL_TAGS:
//       return {
//         ...state,
//         allTags: action.payload.reduce((acc, tag) => {
//           acc[tag.id] = tag;
//           return acc;
//         }, {})
//       };

//     case ADD_TAG:
//       return {
//         ...state,
//         allTags: { ...state.allTags, [action.payload.id]: action.payload }
//       };

//       case DELETE_TAG: {
//         const remainingTags = { ...state.allTags };
//         delete remainingTags[action.payload];
//         return { ...state, allTags: remainingTags };
//       }      

//     case ASSIGN_TAG_TO_NOTE: {
//       const { noteId, tagId } = action.payload;
//       const updatedTags = state.tagsForNote[noteId]
//         ? [...state.tagsForNote[noteId], tagId]
//         : [tagId];
//       return { ...state, tagsForNote: { ...state.tagsForNote, [noteId]: updatedTags } };
//     }

//     case REMOVE_TAG_FROM_NOTE: {
//       const { noteId, tagId } = action.payload;
//       const filteredTags = (state.tagsForNote[noteId] || []).filter(id => id !== tagId);
//       return { ...state, tagsForNote: { ...state.tagsForNote, [noteId]: filteredTags } };
//     }

//     case SET_TAGS_FOR_NOTE:
//       return {
//         ...state,
//         tagsForNote: {
//           ...state.tagsForNote,
//           [action.payload.noteId]: action.payload.tags.map(tag => tag.id)
//         }
//       };

//     default:
//       return state;
//   }
// };
// export default tagsReducer;