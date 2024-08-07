import React, { useState } from 'react';
import axios from 'axios';
import { FaEnvelope, FaLock, FaSignInAlt, FaUserPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const { data } = await axios.post('http://localhost:5000/api/users/login', { email, password });
      localStorage.setItem('userInfo', JSON.stringify(data));
      localStorage.setItem('authToken', data.token);
      window.location.href = '/play';
    } catch (error) {
      setError('Invalid email or password. Please try again.');
      console.error('Error logging in', error);
    }
  };

  return (
    <div className="login">
      <div className="login-header">
        <h1>Login</h1>
        <p className="tagline">Welcome back! Please log in to continue.</p>
      </div>
      <div className="login-form-container">
        <form onSubmit={handleSubmit}>
          {error && <p className="error-message">{error}</p>}
          <div className="form-group">
            <label htmlFor="email">
              <FaEnvelope className="icon" />
              <span className="label-text">Email</span>
            </label>
            <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">
              <FaLock className="icon" />
              <span className="label-text">Password</span>
            </label>
            <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" required />
          </div>
          <button type="submit">
            <FaSignInAlt className="icon" />
            <span>Log In</span>
          </button>
        </form>
        <div className="signup-link">
          <p>Don't have an account? <Link to="/signup"><FaUserPlus className="icon" /> Sign Up</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
