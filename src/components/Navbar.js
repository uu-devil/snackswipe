import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from "../images/sslogo.png";
import text from "../images/sstext.png";
import '../styles/NavBar.css';

export default function Navbar() {
  const [isMobile, setIsMobile] = useState(false);

  // Toggle the mobile menu
  const toggleMenu = () => {
    setIsMobile(!isMobile);
  };

  return (
    <nav className="nav">
      <Link to="/" className="site-title">
        <img src={logo} alt="SnackSwipe Logo" className="logo" />
        <img src={text} alt="SnackSwipe Text" className="text" />
      </Link>

      {/* Hamburger menu button for mobile */}
      <div className="hamburger" onClick={toggleMenu}>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>

      {/* Navigation links */}
      <ul className={`nav-links ${isMobile ? 'active' : ''}`}>
        <li>
          <Link to="/about">About</Link>
        </li>

        <li>
          <Link to="/contact">Contact Us</Link>
        </li>
      </ul>

      {/* Authentication links */}
      <ul className="auth-links">
        <li>
          <Link to="/login" className="glow-button">Login</Link>
        </li>
        <li>
          <Link to="/signup" className="glow-button">SignUp</Link>
        </li>
      </ul>
    </nav>
  );
}