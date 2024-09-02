import React from 'react';
import logo from '../../assets/bbld/logo.png'; // Adjust the path if necessary
import { Link } from 'react-router-dom';
import '../../index.css';
import coin from '../../assets/bbld/coin.gif'
import bbld_char from '../../assets/bbld/bbld_char.jpg'

function About({ loggedIn }) {


  return (
    <div className="main-container">
      <img src={logo} alt="BBLD Logo" className="logo" />

      <h2>Welcome to the BBLD Project!</h2>
      <p>
        The meme coin that’s got more lift than Drizzy's Brazilian butt lift! Dive into a world where crypto meets fun, and where owning BBLD means being part of the coolest community since Drizzy discovered autotune. Imagine trading tokens for exclusive merch, scoring rare NFTs, and jamming to diss tracks that roast Drizzy’s new look.
      </p>
      <p>
        We’re all about building a lively, cheeky community where everyone’s invited to troll, laugh, and profit. With exciting features, hilarious partnerships, and interactive games on the horizon, BBLD is set to shake up the meme coin world like Drizzy’s shake-up on stage. Join us now and get in on the ground floor of the most entertaining coin since PEPE, ETH, and BTC!
      </p>
      <div className="button-group">
        <a href="https://etherscan.io/token/0xdcbadc585a2b0216c2fe01482aff29b37ffbc119" target="_blank" rel="noopener noreferrer">
          <button className="button">View Contract</button>
        </a>

      </div>

      <div className='pretty-cards'>

        <div className='pretty-card'>
          <p>BBLD Coin</p>
          <img src={coin} alt="BBLD" style={{ maxWidth: '25vh', height: 'auto', objectFit: 'contain' }} />

          <Link to="/buy">
            <button className="button">Buy BBLD Coin</button>
          </Link>
        </div>

        <div className='pretty-card'>
          <p>BBLD OG NFT</p>
          <img src={bbld_char} alt="BBLD char" style={{ maxWidth: '25vh', height: 'auto', objectFit: 'contain' }} />

          <Link to="/og_nft">
            <button className="button">Buy OG NFT</button>
          </Link>
        </div>

      </div>

    </div>
  );
}

export default About;
