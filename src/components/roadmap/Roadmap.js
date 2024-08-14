import React from 'react';
import '../../index.css';
import logo from '../../assets/bbld/top_page_logo.png'; // Adjust the path if necessary
import { Link } from 'react-router-dom';
function Roadmap() {
  return (
    <div className="main-container">
      <img src={logo} alt="BBLD Logo" className="logo" />
      <h2>Roadmap</h2>

      <p>
        This will be were the raodmap is defined...
      </p>
      <Link to="/">
          <button className="button">Back</button>
      </Link>
    </div>
  );
}

export default Roadmap;
