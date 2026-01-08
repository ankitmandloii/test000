// src/api.js
import axios from 'axios';

const API_URL = 'http://localhost:8080/api';  // Your backend URL



// Signup API call
export const signupAPIcall = async ({ userName, email, password }) => {
  try {
    const response = await fetch(`${API_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userName, email, password }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Signup failed');
    }
    return data;  // Returning the response data (which should include the token)
  } catch (error) {
    throw error;  // Handle errors
  }
};

// Login API call
export const loginAPIcall = async ({ email, password }) => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Login failed');
    }
    return data;  // Returning the response data (which should include the token)
  } catch (error) {
    throw error;  // Handle errors
  }
};

// Create task
export const createTask = async (taskData, token) => {
  try {
    const response = await axios.post(`${API_URL}/createTask`, taskData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get tasks
export const getTasks = async (token) => {
 try {
    const response = await fetch(`${API_URL}/auth/getTasks`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
    });
    if (!response.ok) {
      throw new Error(data.error || 'Login failed');
    }
    const data = await response.json();
    console.log("Fetched tasks:", data);
    return data;  
  } catch (error) {
    throw error;  
  }
};

// Update task
export const updateTask = async (taskId, taskData, token) => {
  try {
    const response = await axios.post(`${API_URL}/updateTask/${taskId}`, taskData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Delete task
export const deleteTask = async (taskId, token) => {
  try {
    const response = await axios.post(`${API_URL}/deleteTask/${taskId}`, {}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
