import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TypingTest from '../components/TypingTest';
import './Play.css';

const Play = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('userInfo'));
    if (!user) {
      navigate('/login'); // Redirect to login if not authenticated
    }
  }, [navigate]);

  return (
    <div className="play">
      <div className="play-header">
        <h1>Test Your Typing Skills</h1>
        <p className="tagline">Improve your typing speed and accuracy with our interactive test.</p>
      </div>
      <div className="play-container">
        <TypingTest />
      </div>
    </div>
  );
};

export default Play;
