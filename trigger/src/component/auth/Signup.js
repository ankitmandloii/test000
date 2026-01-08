// src/components/Auth/Signup.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate from react-router-dom
import { signupAPIcall } from '../../api';
import './Signup.css';
import { toast } from 'react-toastify';

const Signup = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();  // Use useNavigate hook

  const handleSubmit = async (e) => {
  e.preventDefault();
     try {
       const response = await signupAPIcall({ userName, email, password });
       if (response.error) {
         setMessage(response.error);
         return;
       }
       localStorage.setItem('authToken', response.token);
       toast.success('Signup Successful ! Please log in.');
       navigate('/login');
     } catch (error) {
       setMessage(`Error logging in: ${error.message}`);
     }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="User Name" 
          value={userName} 
          onChange={(e) => setUserName(e.target.value)} 
          required 
        />
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
        <button type="submit">Sign Up</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Signup;
