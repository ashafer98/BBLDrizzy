import React from 'react';
import '../../index.css';
import logo from '../../assets/bbld/top_page_logo.png'; // Adjust the path if necessary
import { Link } from 'react-router-dom';
function OG_NFT() {
  return (
    <div className="home">
      <img src={logo} alt="BBLD Logo" className="home-logo" />
      <h2>OG NFT</h2>

      <p>
        This will be were the future OG NFT mint will take place once we have 100 holders. This will be an ERC1155 contract for our OG holders and will get special rewards for staking and future mints.
      </p>

      <Link to="/">
          <button className="button">Back</button>
      </Link>
    </div>
  );
}

export default OG_NFT;
