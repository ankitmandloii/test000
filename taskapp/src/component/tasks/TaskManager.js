import React, { useState, useEffect } from 'react';
import './TaskManager.css'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const TaskManager = () => {
  const token = localStorage.getItem('authToken');  // Retrieve the token from local storage
  const API_BASE_URL = 'http://localhost:8080/api'; // Adjust to match your API base URL
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [descriptionTask, setDescriptionTask] = useState('');
  const [editTaskId, setEditTaskId] = useState(null);
  
    const navigate = useNavigate();

  // Fetch tasks on component mount
  useEffect(() => {
    if (token) {
      getTasks();

    } else {
      console.error('Token is missing. Please log in.');
    }
  }, [token]);

  // Fetch tasks from API
  const getTasks = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks/getTasks`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,  // Send token in the Authorization header
        },
      });
      const data = await response.json();
      if (response.ok) {

        setTasks(data.tasks);
      } else {
        console.error('Failed to fetch tasks:', data.message);
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  // Create task
  const createTask = async () => {
    try {
      if (!taskName || !descriptionTask) {
        toast.error("Please fill all the fields")
        return;
      }
      const newTask = { taskName, descriptionTask };
      const response = await fetch(`${API_BASE_URL}/tasks/createTask`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,  // Send token in the Authorization header
        },
        body: JSON.stringify(newTask),
      });
      const data = await response.json();
      if (response.ok) {
        setTaskName('');
        setDescriptionTask('');
        getTasks(); // Re-fetch tasks
      } else {
        console.error('Failed to create task:', data.message);
        toast.error(data.message)
      }
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  // Update task
  const updateTask = async () => {
    try {
      const updatedTask = { taskName, descriptionTask };
      const response = await fetch(`${API_BASE_URL}/tasks/updateTask/${editTaskId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,  // Send token in the Authorization header
        },
        body: JSON.stringify(updatedTask),
      });
      const data = await response.json();
      if (response.ok) {
        setTaskName('');
        setDescriptionTask('');
        setEditTaskId(null);
        getTasks(); // Re-fetch tasks
      } else {
        console.error('Failed to update task:', data.message);
      }
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  // Delete task
  const deleteTask = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks/deleteTask/${id}`, {
        method: 'DELETE',  // Use DELETE method instead of POST
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,  // Send token in the Authorization header
        },
      });
      const data = await response.json();
      if (response.ok) {
        getTasks(); // Re-fetch tasks
        toast.success('Task deleted successfully');
      } else {
        console.error('Failed to delete task:', data.message);
        toast.error('Failed to delete task');
      }
    } catch (error) {
      console.error('Error deleting task:', error);
      toast.error('Error deleting task');
    }
  };

  // Handle task edit
  const handleEdit = (task) => {
    setTaskName(task.taskName);
    setDescriptionTask(task.descriptionTask);
    setEditTaskId(task._id);
  };

  const logout = () => {
    localStorage.removeItem('authToken'); 

  navigate('/login'); 
  };

  return (
    <div className='TaskManagerWrapper'>
      <h1 className='heading'>Task Manager</h1>
      <button onClick={logout} className='LogoutButton'>Logout</button>
      <label>
        Task Name
        <input
          type="text"
          placeholder="Task Name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
      </label>
      <label>
        Task Description
        <textarea
          placeholder="Task Description"
          value={descriptionTask}
          onChange={(e) => setDescriptionTask(e.target.value)}
        />
      </label>
      <button onClick={editTaskId ? updateTask : createTask} className='upsertButton'>
        {editTaskId ? 'Update Task' : 'Create Task'}
      </button>

      {tasks.length > 0 && <h2 className='heading'>Tasks List</h2>}
      {tasks.length > 0 ? (
        <ul className='taskWrapper'>
          {tasks.map((task) => (
            <li key={task._id} className='task'>
              <h3>{task.taskName}</h3>
              <p>{task.descriptionTask}</p>
              <button onClick={() => handleEdit(task)}>Edit</button>
              <button onClick={() => deleteTask(task._id)}>Delete</button>
            </li>
          ))}
        </ul>
      ) : (
        <p className='NoTaskHeading'>No tasks available</p>  // Show this message if the task list is empty
      )}
    </div>
  );
};

export default TaskManager;
