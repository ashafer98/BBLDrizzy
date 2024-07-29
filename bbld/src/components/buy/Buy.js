import React from 'react';
import './Buy.css';
import logo from '../../assets/bbld/top_page_logo.png'; // Adjust the path if necessary

function Buy() {
  return (
    <div className="buy">
      <img src={logo} alt="BBLD Logo" className="buy-logo" />
      <h2>Buy BBLD Tokens</h2>
      <p>
        Welcome to the BBLD Project! The meme coin that’s got more lift than Drizzy's Brazilian butt lift! By owning BBLD, you're joining the coolest community in crypto.
      </p>
      <p>
        To buy BBLD tokens, click the button below. Make sure you have your wallet connected and enough ETH for the transaction.
      </p>
      <button className="buy-button" onClick={() => alert('Buy functionality coming soon!')}>
        Buy BBLD Tokens
      </button>
    </div>
  );
}

export default Buy;
