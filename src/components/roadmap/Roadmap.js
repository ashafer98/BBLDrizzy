import React from 'react';
import '../../index.css';
import logo from '../../assets/bbld/top_page_logo.png'; // Adjust the path if necessary
import { Link } from 'react-router-dom';
function Roadmap() {
  return (
    <div className="main-container">
      <img src={logo} alt="BBLD Logo" className="logo" />
      <h2>Roadmap</h2>

      <div className="roadmap-phase">
        <h3>PHASE 1: 100 Holders</h3>
        <ul>
          <li>Deploy on Uniswap</li>
          <li>Release 1 of 100 NFT for OGs</li>
          <li>Create BBLD army of trolls posting content for Early BBLD tokens</li>
          <li>Opportunity to trade BBLD for merch</li>
          <li>Reach 1 Million Market Cap</li>
          <li>Collaborate with smaller artists who create Drake BBL diss music</li>
        </ul>
      </div>

      <div className="roadmap-phase">
        <h3>PHASE 2: 250 Holders</h3>
        <ul>
          <li>Release 1-10,000 NFTs</li>
          <li>Reach 10 Million Market Cap</li>
          <li>Collaborate with medium-sized artists for Drake BBL diss music or ART</li>
          <li>Add web3 login for site features (must own at least 10 BBLD to access)</li>
          <li>Introduce wrapped pairs on other Decentralized Exchanges besides Uniswap</li>
          <li>Implement brand ambassadors to help make money and initiate a buy-back program</li>
        </ul>
      </div>

      <div className="roadmap-phase">
        <h3>PHASE 3: 1000+ Holders</h3>
        <ul>
          <li>Reach 100 Million Market Cap</li>
          <li>Listing on Centralized Exchanges</li>
          <li>Engage large celebrity influencers</li>
          <li>Develop Drake BBL Maze Runner game</li>
        </ul>
      </div>
      <Link to="/">
        <button className="button">Back</button>
      </Link>
    </div>
  );
}




export default Roadmap;
