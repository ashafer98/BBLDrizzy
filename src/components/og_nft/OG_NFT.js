import React from 'react';
import '../../index.css';
import logo from '../../assets/bbld/top_page_logo.png'; // Adjust the path if necessary
import bbldchar from '../../assets/bbld/bbld_char.jpg'; // Adjust the path if necessary
import { Link } from 'react-router-dom';

function OG_NFT() {
  return (
    <div className="main-container" style={{ textAlign: 'center' }}>
      <img src={logo} alt="BBLD Logo" className="logo" />
      <h2>OG NFT</h2>

      <div style={{ marginBottom: '40px' }}>
        <p>This will be where the future OG NFT mint will take place once we have 100 holders.</p>
        <p>This will be an ERC1155 contract for our OG holders and will get special rewards for staking and future mints.</p>
        <p>ONE OG NFT PER WALLET!</p>
      </div>

      {/* Centering the pretty card */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '40px' }}>
        <div className='pretty-card' style={{ padding: '20px', boxShadow: '0px 0px 10px rgba(0,0,0,0.1)', borderRadius: '10px', width: '300px' }}>
          <img src={bbldchar} alt="BBLD char" style={{ maxWidth: '100%', height: 'auto', objectFit: 'contain', marginBottom: '20px' }} />
          <p>You Own: X amount of OG NFTs</p>
          <p>Cost: X amount of BBLD</p>
          <Link to="/">
            <button className="button">Buy</button>
          </Link>
        </div>
      </div>

      <Link to="/">
        <button className="button">Back</button>
      </Link>
    </div>
  );
}

export default OG_NFT;
