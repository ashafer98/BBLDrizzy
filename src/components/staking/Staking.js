import React from 'react';
import '../../index.css';
import logo from '../../assets/bbld/logo.png'; // Adjust the path if necessary
import bbldchar from '../../assets/bbld/bbld_char.jpg'; // Adjust the path if necessary
import { Link } from 'react-router-dom';

function Staking() {
  return (
    <div className="main-container" style={{ textAlign: 'center' }}>
      <img src={logo} alt="BBLD Logo" className="logo" />
      <h2>Staking (EXAMPLE PAGE)</h2>
      <h2>Your BBLD Balance: X amount of BBLD</h2>
      <p>This will be where the future staking will take place once we mint out of our 100 holders. Use your BBLD to earn more BBLD or use your OG NFT to earn you more BBLD.</p>

      {/* Centered Cards Container */}
      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '20px' }}>
        {/* UnStaked OG NFT Card */}
        <div className="pretty-card" style={{ marginBottom: '40px', padding: '20px', width: '300px', boxShadow: '0px 0px 10px rgba(0,0,0,0.1)', borderRadius: '10px' }}>
          <h2>UnStaked OG NFTs : 0</h2>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <img src={bbldchar} alt="BBLD char" className="bbldchar" style={{ maxWidth: '100%', height: 'auto', objectFit: 'contain', marginBottom: '20px' }} />
            <button className="button" style={{ padding: '10px 20px', cursor: 'pointer' }}>Stake Your OG NFT</button>
          </div>
        </div>

        {/* Staked OG NFT Card */}
        <div className="pretty-card" style={{ marginBottom: '40px', padding: '20px', width: '300px', boxShadow: '0px 0px 10px rgba(0,0,0,0.1)', borderRadius: '10px' }}>
          <h2>Staked OG NFTs : 1</h2>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <img src={bbldchar} alt="BBLD char" className="bbldchar" style={{ maxWidth: '100%', height: 'auto', objectFit: 'contain', marginBottom: '20px' }} />
            You have X unclaimed BBLDrizzy!
            <button className="button" style={{ padding: '10px 20px', cursor: 'pointer', marginBottom: '10px' }}>Collect BBLD</button>
            <button className="button" style={{ padding: '10px 20px', cursor: 'pointer' }}>Unstake OG NFT</button>
          </div>
        </div>
      </div>

      <Link to="/">
        <button className="button">Back</button>
      </Link>
    </div>
  );
}

export default Staking;
