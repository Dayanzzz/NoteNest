import { useState, useEffect } from 'react';
import { useDispatch, useSelector, useNavigate } from 'react-redux';
import { createATaskThunk, setAllTasksThunk, editATaskThunk, deleteATaskThunk } from '../../redux/tasks';
// import { AlertCircle, Edit, Trash2, Plus, Clock, User } from 'lucide-react';
import './tasks.css';



// SingleTaskDetail.jsx
export const SingleTaskDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const task = useSelector(state => state.tasks.singleTask);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: '',
    description: ''
  });

  useEffect(() => {
    if (task.id) {
      setEditData({
        name: task.name,
        description: task.description
      });
    }
  }, [task]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const response = await dispatch(editATaskThunk({
      id: task.id,
      ...editData
    }));

    if (!response.error) {
      setIsEditing(false);
      navigate('/tasks');
    }
  };

  const handleDelete = async () => {
    await dispatch(deleteATaskThunk(task.id));
    navigate('/tasks');
  };

  if (!task) return <div>Loading...</div>;

  return (
    <div className="single-task-container">
      <h2>TASK Name HERE</h2>
      <div className="task-content">
        {isEditing ? (
          <form onSubmit={handleUpdate}>
            <input
              type="text"
              value={editData.name}
              onChange={e => setEditData(prev => ({...prev, name: e.target.value}))}
            />
            <textarea
              value={editData.description}
              onChange={e => setEditData(prev => ({...prev, description: e.target.value}))}
            />
            <div className="button-group">
              <button type="submit">Save Changes</button>
              <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
            </div>
          </form>
        ) : (
          <>
            <div className="task-details">
              <h3>Task Details:</h3>
              <p>{task.description}</p>
            </div>
            <div className="task-actions">
              <button onClick={() => setIsEditing(true)} className="update-btn">
                UPDATE
              </button>
              <button onClick={() => setIsEditing(true)} className="complete-btn">
                Mark Complete
              </button>
              <button onClick={handleDelete} className="delete-btn">
                DELETE
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
