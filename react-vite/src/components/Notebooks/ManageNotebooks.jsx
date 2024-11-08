import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllNotebooks } from "../../redux/notebooks";
import ManageNotebooksStyles from "../Notebooks/ManageNotebooksStyles.css";
import { FaBook } from "react-icons/fa";
import Sidebar from "../Sidebar/Sidebar";

function ManageNotebooks() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.session.user);
  const notebooks = useSelector((state) => state.notebooks.notebooks);

  //Grab the user's Notebooks from the store
  useEffect(() => { 
    dispatch(getAllNotebooks());
}, [dispatch]);
  // Display up to 8 notebooks
  return (
    <div className="page-wrapper">
      <Sidebar />
      {/* NavBar End */}
      <div className="note-books-area">
            <h1 className="manage-notebook-header">NOTEBOOKS</h1>
            <div className="notebooks-populated-area">
              {notebooks.map((notebook) => (
                <div className="notebook-instance" key={notebook.id}>
                  <h1 className="notebook-icon"><FaBook /></h1>
                  <h3>{notebook.name}</h3>
                  <div className="edit-delete-btn-area">
                    <button>Edit</button><button>Delete</button>
                  </div>                
                </div>
              ))}
              </div>
      </div>
    </div>

)
}

export default ManageNotebooks;
