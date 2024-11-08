import { useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { setAllTasksThunk,deleteATaskThunk } from '../../redux/tasks';
// import { AlertCircle, Edit, Trash2, Plus, Clock, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './tasks.css';


// ViewAllTasks.jsx
export const ViewAllTasks = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const sessionUser = useSelector(state => state.session.user);
  const tasksObj = useSelector(state => state.tasks.allTasks);


  // Convert tasks object to array and filter for current user
  const tasks = Object.values(tasksObj || {}).filter(task => 
    task && task.user_id === sessionUser?.id
  );



  


    // Debug prints
    console.log("Session User:", sessionUser);
    console.log("Tasks in store:", tasksObj);
  

  console.log("let me see:", tasks)

  useEffect(() => {
  
    if(sessionUser) {
      dispatch(setAllTasksThunk());
    }
  }, [dispatch, sessionUser]);

  const handleDelete = async (taskId) => {
    await dispatch(deleteATaskThunk(taskId));
    await dispatch(setAllTasksThunk());
  };



  if(!sessionUser){
    return <div>Please log in to view tasks</div>
  }

  return (
    <div className="tasks-page">
      <h1>TASKS</h1>
      <div className="tasks-grid">
        {tasks && tasks.length > 0 ? (
          tasks.map(task => (
            <div key={task.id} className="task-card">
              <h3>{task.name}</h3>
              <p>{task.description}</p>
              <div className="task-actions">
                {/* Added created_at display */}
                <div className="task-date">
                  {new Date(task.created_at).toLocaleDateString()}
                </div>
                <div className="action-buttons">
                  <button
                    className="update-btn"
                    onClick={() => navigate(`/tasks/${task.id}`)}
                  >
                    UPDATE
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(task.id)}
                  >
                    DELETE
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No tasks found. Create a new task to get started!</p>
        )}
      </div>
    </div>
  );
};
