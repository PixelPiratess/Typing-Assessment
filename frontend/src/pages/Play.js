import React from 'react';
import TypingTest from '../components/TypingTest';
import './Play.css';

const Play = () => {
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
