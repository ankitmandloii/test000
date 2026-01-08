// src/components/Auth/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginAPIcall } from '../../api';
import {  toast } from 'react-toastify';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginAPIcall({ email, password });
      if (!response.token) {
        throw new Error('No token received');
      }
      localStorage.setItem('authToken', response.token);
      toast('Login Successful');
      navigate('/taskDashboard');
    } catch (error) {
      setMessage(`Error logging in: ${error.message}`);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <button type="submit">Login</button>

        <a onClick={() => navigate('/signup')} >Signup</a>

      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Login;
