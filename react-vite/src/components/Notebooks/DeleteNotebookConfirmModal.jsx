import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../context/Modal';
import '../../components/Notebooks/DeleteNotebookConfirmModal.css';
import { deleteANotebook } from '../../redux/notebooks';

function DeleteNotebookConfirmModal({ notebookId }) {
const dispatch = useDispatch();
  const { closeModal } = useModal();
  const notebooks = useSelector((state) => state.notebooks.notebooks);

  const handleDelete = (notebookId) => {
    console.log('Notebook ID: Modal Handle Delete//////', notebookId)
    try {
      dispatch(deleteANotebook(notebookId));
      closeModal();
    } catch (error) {

      throw new Error("Error when trying to delete a Notebook.");
    }
  };

  return (
    
    <div className='shiny-metal-bg'>
      <h1 className='titleText'>Confirm Delete</h1>
      <h2 className='subhead'>Are you sure you want to remove this Notebook from your library?</h2>
      <div className='buttonDiv'>
        <button className='closeBtn' type="submit" onClick={() => closeModal()}>{"No (Keep Notebook)"}</button>
        <button type='button' onClick={() => handleDelete(notebookId)}>{"Yes (Delete Notebook)"}</button>
      </div>
    </div>
    
  );
}

export default DeleteNotebookConfirmModal;