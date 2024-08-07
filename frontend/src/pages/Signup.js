import React, { useState } from 'react';
import axios from 'axios';
import { FaUser, FaEnvelope, FaLock, FaSignInAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Signup.css';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const { data } = await axios.post('http://localhost:5000/api/users/register', { username, email, password });
      localStorage.setItem('userInfo', JSON.stringify(data));
      window.location.href = '/play'; // Navigate to play page after successful signup
    } catch (error) {
      setError('Error signing up. Please try again.');
      console.error('Error signing up', error);
    }
  };

  return (
    <div className="signup">
      <div className="signup-header">
        <h1>Sign Up</h1>
        <p className="tagline">Create an account to get started.</p>
      </div>
      <div className="signup-form-container">
        <form onSubmit={handleSubmit}>
          {error && <p className="error-message">{error}</p>}
          <div className="form-group">
            <label htmlFor="username">
              <FaUser className="icon" />
              <span className="label-text">Username</span>
            </label>
            <input type="text" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter your username" required />
          </div>
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
            <span>Sign Up</span>
          </button>
        </form>
        <div className="login-link">
          <p>Already have an account? <Link to="/login">Log In</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
