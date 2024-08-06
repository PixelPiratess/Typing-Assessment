import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaPlay, FaInfo, FaEnvelope, FaSignInAlt, FaKeyboard } from 'react-icons/fa';
import './NavigationBar.css';

const NavigationBar = () => {
  return (
    <nav className="navbar">
      <h1><FaKeyboard className="nav-icon" /> Typing Master</h1>
      <ul>
        <li><Link to="/"><FaHome className="nav-icon" /> Home</Link></li>
        <li><Link to="/play"><FaPlay className="nav-icon" /> Play</Link></li>
        <li><Link to="/about"><FaInfo className="nav-icon" /> About</Link></li>
        <li><Link to="/contact"><FaEnvelope className="nav-icon" /> Contact</Link></li>
        <li><Link to="/login"><FaSignInAlt className="nav-icon" /> Login</Link></li>
      </ul>
    </nav>
  );
};

export default NavigationBar;