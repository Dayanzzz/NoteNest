import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllNotebooks } from "../../redux/notebooks";
import Sidebar from "../Sidebar/Sidebar";
import OpenModalButton from "./OpenModalButton";
import DeleteNotebookConfirmModal from "./DeleteNotebookConfirmModal";
import ManageNotebooksStyles from "../Notebooks/ManageNotebooksStyles.css";
import EditNotebookModal from "./EditNotebookModal";
import { FaBook } from "react-icons/fa";

function ManageNotebooks() {
  const dispatch = useDispatch();
  // const user = useSelector((store) => store.session.user);
  const notebooks = useSelector((state) => state.notebooks.notebooks);

  //Grab the user's Notebooks from the store
  useEffect(() => { 
    dispatch(getAllNotebooks());
}, [dispatch], notebooks);
  // Display up to 8 notebooks
  return (
    <div className="page-wrapper">
      <Sidebar />
      {/* NavBar End */}
      <div className="note-books-area">
            <h1 className="manage-notebook-header">NOTEBOOKS</h1>
            <div className="notebooks-page-populated-area">
              {notebooks.map((notebook) => (
                <div className="notebook-instance" key={notebook.id}>
                  <h1 className="notebook-icon"><FaBook /></h1>
                  <div className="manage-notebook-title">
                    <h3>{notebook.name}</h3>
                  </div>
                  <div className="edit-delete-btn-area">
                    <OpenModalButton buttonText="Edit"  modalComponent={<EditNotebookModal notebook={notebook}/>}/>
                    <OpenModalButton buttonText="Delete"  modalComponent={<DeleteNotebookConfirmModal notebookId={notebook.id}/>}/>
                  </div>                
                </div>
              ))}
              </div>
      </div>
    </div>

)
}
export default ManageNotebooks;
