import React from 'react';
import './Home.css';
import logo from '../../assets/bbld/top_page_logo.png'; // Adjust the path if necessary

function Home() {
  return (
    <div className="home">
      <img src={logo} alt="BBLD Logo" className="home-logo" />
      <h2>Logged into BBLDrizzy</h2>

      <p>
        This will be the future login for holders who have BBLD. They will only be allowed here.
      </p>
      <button className="home-button" onClick={() => alert('Welcome to BBLD!')}>
        Learn More
      </button>
    </div>
  );
}

export default Home;
