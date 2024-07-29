import React from 'react';
import './About.css';
import logo from '../assets/bbld/top_page_logo.png'; // Adjust the path if necessary

function About() {
  return (
    <div className="about">
        <img src={logo} alt="BBLD Logo" className="about-logo" />

      <h2>Welcome to the BBLD Project!</h2>
      <p>
        The meme coin that’s got more lift than Drizzy's Brazilian butt lift! Dive into a world where crypto meets fun, and where owning BBLD means being part of the coolest community since Drizzy discovered autotune. Imagine trading tokens for exclusive merch, scoring rare NFTs, and jamming to diss tracks that roast Drizzy’s new look.
      </p>
      <p>
        We’re all about building a lively, cheeky community where everyone’s invited to troll, laugh, and profit. With exciting features, hilarious partnerships, and interactive games on the horizon, BBLD is set to shake up the meme coin world like Drizzy’s shake-up on stage. Join us now and get in on the ground floor of the most entertaining coin since PEPE, ETH, and BTC!
      </p>
      <a href="https://etherscan.io/token/0xdcbadc585a2b0216c2fe01482aff29b37ffbc119" target="_blank" rel="noopener noreferrer">
        <button className="contract-button">View Contract</button>
      </a>    </div>
  );
}

export default About;
