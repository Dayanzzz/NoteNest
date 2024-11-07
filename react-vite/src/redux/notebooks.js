
const initialState = {
    notebooks: [],
};

// Action Type
const GET_NOTEBOOKS = "notebooks/getNotebooks";

// Action creator
const getNotebooks = (notebooks) => ({
    type: GET_NOTEBOOKS,
    payload: notebooks,
});

// Thunks
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

        default: 
            return state;
    }
};

export default notebooksReducer;