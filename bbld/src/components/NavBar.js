import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';
import logo from '../assets/bbld/Main_Logo.png'; // Import the image

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/">
          <img src={logo} alt="Logo" className="navbar-logo" />
        </Link>
        <Link to="/" className="navbar-title-link">
          <h1 className="navbar-title">BBLDrizzy.eth</h1>
        </Link>
      </div>
      <div className="navbar-right">
        <Link to="/buy" className="navbar-button-link">
          <button className="navbar-button">Buy</button>
        </Link>
        <Link to="/home" className="navbar-button-link">
          <button className="navbar-button">Login</button>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
