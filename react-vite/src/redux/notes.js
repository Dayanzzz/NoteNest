
const GET_NOTES = 'notes/getNotes';


const getNotes = (notes) => ({
  type: GET_NOTES,
  payload: notes,
});


export const thunkFetchNotes = () => async (dispatch) => {
    try {
      const response = await fetch('/api/notes');  
      
      if (response.ok) {
        const data = await response.json();
        console.log("Fetched Notes:", data);  
        dispatch(getNotes(data));  
      } else if (response.status < 500) {
        const errorMessages = await response.json();
        console.error("Error fetching notes:", errorMessages);
        return errorMessages;
      } else {
        console.error("Server error:", response.status);
        return { server: "Something went wrong. Please try again" };
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };


const initialState = {
  notes: [],
};

const notesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_NOTES:
      return {
        ...state,
        notes: action.payload,
      };
    default:
      return state;
  }
};

export default notesReducer;