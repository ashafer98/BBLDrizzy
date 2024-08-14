// src/components/profile/Profile.js
import React, { useState } from 'react';
import '../../index.css';
import logo from '../../assets/bbld/top_page_logo.png'; // Adjust the path if necessary
import { initializeTatum } from '../../services/bbldService'; // Import the function
import { useUser } from '../../contexts/UserContext';
import { Link } from 'react-router-dom';
export default function Profile() {
  const { userAddress } = useUser();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [balance, setBalance] = useState("");

  const getBalance = async () => {
    setLoading(true);
    setError("");
    setBalance("");

    try {
      const { contractInstance } = await initializeTatum();
      const bal = await contractInstance.methods.balanceOf(userAddress).call();
      setBalance(`${bal} BBLD`);
    } catch (e) {
      setError("Failed to fetch balance: " + e.message);
    }

    setLoading(false);
  };

  return (
    <div className="main-container">
      <img src={logo} alt="BBLD Logo" className="logo" />
      <h2>Welcome {userAddress}</h2>
      <p>
        Welcome to your BBLD token profile!<br />
        Here you can check your token balance. We will be adding more features soon.
      </p>
      <button 
        className="button" 
        disabled={loading} 
        onClick={getBalance}
      >
        {loading ? 'Loading...' : 'Get Balance'}
      </button>
      <Link to="/">
          <button className="button">Back</button>
      </Link>
      <div className="profile-result">
        {balance && <h3 id="balance">{balance}</h3>}
        {error && <div id="error" className="error-message">{error}</div>}
      </div>
    </div>
  );
}
