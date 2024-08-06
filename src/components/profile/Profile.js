// src/components/profile/Profile.js
import React, { useState } from 'react';
import './Profile.css'; // Import the CSS file
import logo from '../../assets/bbld/top_page_logo.png'; // Adjust the path if necessary
import { initializeTatum } from '../../services/bbldService'; // Import the function

export default function Profile() {
  const [address, setAddress] = useState("0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045"); // Default address
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [balance, setBalance] = useState("");

  const getBalance = async () => {
    setLoading(true);
    setError("");
    setBalance("");

    try {
      const { web3, contractInstance } = await initializeTatum();
      const bal = await contractInstance.methods.balanceOf(address).call();
      const balanceInEther = web3.utils.fromWei(bal, 'ether'); // Convert balance to Ether
      setBalance(`${balanceInEther} BBLD`);
    } catch (e) {
      setError("Failed to fetch balance: " + e.message);
    }

    setLoading(false);
  };

  return (
    <div className="profile">
      <img src={logo} alt="BBLD Logo" className="profile-logo" />
      <h2>Profile</h2>
      <p>
        Welcome to your BBLD token profile! Here you can check your token balance and manage your holdings.
      </p>
      <div className="profile-form">
        <label>
          <div><b>Wallet Address</b></div>
          <input 
            type="text" 
            value={address} 
            onChange={(e) => setAddress(e.target.value)} 
          />
        </label>
        <button 
          className="profile-button" 
          disabled={loading} 
          onClick={getBalance}
        >
          {loading ? 'Loading...' : 'Get Balance'}
        </button>
      </div>
      <div className="profile-result">
        {balance && <h3 id="balance">{balance}</h3>}
        {error && <div id="error">{error}</div>}
      </div>
    </div>
  );
}
