import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaPlay, FaInfo, FaEnvelope, FaSignInAlt, FaKeyboard } from 'react-icons/fa';
import './NavigationBar.css';

const NavigationBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="logo"><FaKeyboard className="nav-icon" /> Typing Master</h1>
        <div className="burger" onClick={toggleMenu}>
          <input type="checkbox" checked={isOpen} onChange={toggleMenu} />
          <span></span>
          <span></span>
          <span></span>
        </div>
        <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
          <li><Link to="/" onClick={toggleMenu}><FaHome className="nav-icon" /> Home</Link></li>
          <li><Link to="/play" onClick={toggleMenu}><FaPlay className="nav-icon" /> Play</Link></li>
          <li><Link to="/about" onClick={toggleMenu}><FaInfo className="nav-icon" /> About</Link></li>
          <li><Link to="/contact" onClick={toggleMenu}><FaEnvelope className="nav-icon" /> Contact</Link></li>
          <li><Link to="/login" onClick={toggleMenu}><FaSignInAlt className="nav-icon" /> Login</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default NavigationBar;
