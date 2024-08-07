import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaPlay, FaInfo, FaEnvelope, FaSignInAlt, FaKeyboard, FaUserCircle, FaSignOutAlt, FaTachometerAlt, FaChartLine } from 'react-icons/fa';
import './NavigationBar.css';

const NavigationBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('userInfo')); // Assuming user info is stored in localStorage
  const navRef = useRef(null);
  const userMenuRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleSignOut = () => {
    if (window.confirm('Are you sure you want to sign out?')) {
      localStorage.removeItem('userInfo');
      navigate('/login');
    }
  };

  const handleClickOutside = (event) => {
    if (navRef.current && !navRef.current.contains(event.target)) {
      setIsOpen(false);
    }
    if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
      setShowUserMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar" ref={navRef}>
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
          <li><Link to="/leaderboard" onClick={toggleMenu}><FaChartLine className="nav-icon" /> Leaderboard</Link></li>
          <li><Link to="/contact" onClick={toggleMenu}><FaEnvelope className="nav-icon" /> Contact</Link></li>
          {user ? (
            <li className="user-menu">
              <button className="user-button" onClick={() => setShowUserMenu(!showUserMenu)}>
                <FaUserCircle className="user-icon" /> {user.username}
              </button>
              <ul className={`user-options ${showUserMenu ? 'show' : ''}`} ref={userMenuRef}>
                <li><Link to="/dashboard" onClick={() => setShowUserMenu(false)}><FaTachometerAlt className="nav-icon" /> Dashboard</Link></li>
                <li><button onClick={handleSignOut}><FaSignOutAlt className="nav-icon" /> Sign Out</button></li>
              </ul>
            </li>
          ) : (
            <li><Link to="/login" onClick={toggleMenu}><FaSignInAlt className="nav-icon" /> Login</Link></li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavigationBar;
