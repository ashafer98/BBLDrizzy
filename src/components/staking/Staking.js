import React from 'react';
import '../../index.css';
import logo from '../../assets/bbld/top_page_logo.png'; // Adjust the path if necessary
import { Link } from 'react-router-dom';
function Staking() {
  return (
    <div className="main-container">
      <img src={logo} alt="BBLD Logo" className="logo" />
      <h2>Staking</h2>

      <p>
        This will be were the future staking will take place once we mint out of our 100 holders. Use your BBLD to earn more BBLD or use your OG NFT to earn you more BBLD.
      </p>
      <Link to="/">
          <button className="button">Back</button>
      </Link>
    </div>
  );
}

export default Staking;
