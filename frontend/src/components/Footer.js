import React from 'react';
import { FaTwitter, FaFacebook, FaInstagram } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>© 2024 Pixel Pirates. All rights reserved.</p>
        <div className="footer-links">
          <a href="https://twitter.com"><FaTwitter /></a>
          <a href="https://facebook.com"><FaFacebook /></a>
          <a href="https://instagram.com"><FaInstagram /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;