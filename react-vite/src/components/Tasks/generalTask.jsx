import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createATaskThunk, setAllTasksThunk, setOneTaskThunk, deleteATaskThunk } from '../../redux/tasks';
// import { AlertCircle, Edit, Trash2, Plus, Clock, User } from 'lucide-react';
import './tasks.css';

// Create Task Component
const CreateTask = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });
  const [errors, setErrors] = useState([]);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await dispatch(createATaskThunk(formData));
    
    if (response.error) {
      setErrors([response.error]);
    } else {
      setFormData({ name: '', description: '' });
    }
  };

  return (
    <div className="task-create-container">
      <div className="task-create-header">
        <h2>CREATE A TASK</h2>
      </div>
      <div className="task-create-content">
        <form onSubmit={handleSubmit} className="task-form">
          {errors.length > 0 && (
            <div className="task-error-container">
              {errors.map((error, idx) => (
                <div key={idx} className="task-error">
                  <AlertCircle className="error-icon" />
                  <span>{error}</span>
                </div>
              ))}
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
              maxLength={80}
            />
          </div>
          
          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          
          <div className="form-actions">
            <button type="submit" className="btn-primary">
              Create Task
            </button>
            <button
              type="button"
              onClick={() => setFormData({ name: '', description: '' })}
              className="btn-secondary"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Tasks List Component
const TasksList = () => {
  const dispatch = useDispatch();
  const tasks = useSelector(state => Object.values(state.tasks.allTasks));
  const currentUser = useSelector(state => state.session.user);

  useEffect(() => {
    dispatch(setAllTasksThunk());
  }, [dispatch]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="tasks-list-container">
      <div className="tasks-header">
        <h1>TASKS</h1>
        <button className="btn-primary">
          <Plus className="icon-small" />
          New Task
        </button>
      </div>
      
      <div className="tasks-grid">
        {tasks.map(task => (
          <div key={task.id} className="task-card">
            <div className="task-card-content">
              <div className="task-info">
                <h3>{task.name}</h3>
                <p className="task-description">{task.description}</p>
                <div className="task-meta">
                  <span className="task-date">
                    <Clock className="icon-small" />
                    {formatDate(task.created_at)}
                  </span>
                  <span className="task-user">
                    <User className="icon-small" />
                    {task.user?.username || 'Unknown User'}
                  </span>
                </div>
              </div>
              <div className="task-actions">
                <button className="btn-icon">
                  <Edit className="icon-small" />
                </button>
                <button 
                  className="btn-icon delete"
                  onClick={() => dispatch(deleteATaskThunk(task.id))}
                >
                  <Trash2 className="icon-small" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Single Task View Component
const SingleTaskView = ({ taskId }) => {
  const dispatch = useDispatch();
  const task = useSelector(state => state.tasks.singleTask);

  useEffect(() => {
    dispatch(setOneTaskThunk(taskId));
  }, [dispatch, taskId]);

  if (!task) {
    return <div className="loading">Loading...</div>;
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="task-detail-container">
      <div className="task-detail-header">
        <h2>{task.name}</h2>
        <div className="task-detail-actions">
          <button className="btn-primary">
            <Edit className="icon-small" />
            Update
          </button>
          <button className="btn-danger">
            <Trash2 className="icon-small" />
            Delete
          </button>
        </div>
      </div>
      <div className="task-detail-content">
        <div className="task-section">
          <h3>Created By</h3>
          <p className="task-creator">
            <User className="icon-small" />
            <span>{task.user?.username || 'Unknown User'}</span>
          </p>
        </div>
        
        <div className="task-section">
          <h3>Task Details</h3>
          <p className="task-description">
            {task.description || 'No description provided'}
          </p>
        </div>
        
        <div className="task-dates">
          <div className="task-date-section">
            <h3>Created</h3>
            <p>{formatDate(task.created_at)}</p>
          </div>
          
          <div className="task-date-section">
            <h3>Last Updated</h3>
            <p>{formatDate(task.updated_at)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export { CreateTask, TasksList, SingleTaskView };
