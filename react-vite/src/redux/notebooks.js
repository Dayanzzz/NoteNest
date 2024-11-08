
const initialState = {
    notebooks: [],
};

// Action Type
const GET_NOTEBOOKS = "notebooks/getNotebooks";
const ADD_NOTEBOOK = "notebooks/addNotebook";

// Action creator
const getNotebooks = (notebooks) => ({
    type: GET_NOTEBOOKS,
    payload: notebooks,
});

const addNotebook = (addedNotebook) => ({
    type: ADD_NOTEBOOK,
    payload: addedNotebook,
});

/////////////////////// THUNKS //////////////////////////


///////Add a Notebook THUNK
export const createNotebook = (addedNotebook) => async (dispatch) => {
    const { name } = addedNotebook;

    try {
        const response = await fetch("/api/notebooks", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name })
        });
        const data = await response.json();

        if (!response.ok) {
            if (response.status === 400) {
                console.error('Validation Errors:', data.errors);
                throw data.errors;
            }
            throw new Error(data.message || 'Failed to create a notebook');
        }

        dispatch(addNotebook(data));
        return data;

    } catch (error) {
        console.error('Error creating notebook:', error);
        throw error;
    }
};



/////Get ALL Notebooks THUNK
export const getAllNotebooks = () => async (dispatch) => {
    const response = await fetch("/api/notebooks");


    if(response.ok) {
        const data = await response.json();
        dispatch(getNotebooks(data));
        console.log("data",data)

    } else if (response.status < 500) {
        const errorMessages = await response.json();
        return errorMessages
      } else {
        return { server: "Something went wrong. Please try again" }
      }
    
};


///////////// NOTEBOOK REDUCER /////////////
const notebooksReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_NOTEBOOKS:
            return {
                ...state,
                notebooks: action.payload,
            };

        case ADD_NOTEBOOK:
            return {
                ...state,
                notebooks: [...state.notebooks, action.payload],
            };
        default: 
            return state;
    }
};

export default notebooksReducer;