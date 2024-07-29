import React from 'react';
import './NavBar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src="path/to/your/logo.png" alt="Logo" className="navbar-logo" />
        <h1 className="navbar-title">My Navbar</h1>
      </div>
      <div className="navbar-right">
        <button className="navbar-button">Buy</button>
        <button className="navbar-button">Login</button>
      </div>
    </nav>
  );
}

export default Navbar;

