import React from 'react';
import '../../index.css';
import logo from '../../assets/bbld/top_page_logo.png'; // Adjust the path if necessary
import { Link } from 'react-router-dom';
function Team() {
  return (
    <div className="main-container">
      <img src={logo} alt="BBLD Logo" className="logo" />
      <h2>Team</h2>

      <p>
        This will be were the team will tell more about ourselves and who we are and why we are doing this...
      </p>
      <Link to="/">
          <button className="button">Back</button>
      </Link>
    </div>
  );
}

export default Team;
