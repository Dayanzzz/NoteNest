import { useState, useEffect } from 'react';
import { useDispatch, useSelector, useNavigate } from 'react-redux';
import { createATaskThunk, setAllTasksThunk, editATaskThunk, deleteATaskThunk } from '../../redux/tasks';
// import { AlertCircle, Edit, Trash2, Plus, Clock, User } from 'lucide-react';
import './tasks.css';


// CreateTask.jsx
export const CreateTask = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    priority: 'low'
  });
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await dispatch(createATaskThunk(formData));
    
    if (response.error) {
      setErrors([response.error]);
    } else {
      navigate('/tasks');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="create-task-container">
      <div className="left-panel">
        <div className="task-preview">
          <h3>Task Title</h3>
          <p>preview here.</p>
        </div>
      </div>
      <div className="right-panel">
        <h2>CREATE A TASK</h2>
        <form onSubmit={handleSubmit}>
          {errors.length > 0 && (
            <div className="errors">
              {errors.map((error, idx) => <p key={idx}>{error}</p>)}
            </div>
          )}

          <div className="form-group">
            <label>Task Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Priority</label>
            <div className="priority-options">
              <label className="priority-label">
                <input
                  type="radio"
                  name="priority"
                  value="low"
                  checked={formData.priority === 'low'}
                  onChange={handleChange}
                />
                <span className="priority-btn low">Low</span>
              </label>
              <label className="priority-label">
                <input
                  type="radio"
                  name="priority"
                  value="medium"
                  checked={formData.priority === 'medium'}
                  onChange={handleChange}
                />
                <span className="priority-btn medium">Medium</span>
              </label>
              <label className="priority-label">
                <input
                  type="radio"
                  name="priority"
                  value="high"
                  checked={formData.priority === 'high'}
                  onChange={handleChange}
                />
                <span className="priority-btn high">High</span>
              </label>
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="create-btn">Create Task</button>
            <button type="button" onClick={() => navigate('/tasks')} className="cancel-btn">
              CANCEL
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
