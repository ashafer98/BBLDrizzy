// src/components/navbar/NavBar.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Web3 from 'web3';
import './NavBar.css';
import logo from '../../assets/bbld/Main_Logo.png'; // Import the image
import { useUser } from '../../contexts/UserContext';

function Navbar({ loggedIn, setLoggedIn }) {
  const [account, setAccount] = useState(null);
  const navigate = useNavigate();
  const { setUserAddress } = useUser();

  useEffect(() => {
    const checkMetaMaskConnection = async () => {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        try {
          const accounts = await web3.eth.getAccounts();
          if (accounts.length > 0) {
            setAccount(accounts[0]);
            setLoggedIn(true);
            setUserAddress(accounts[0]); // Update context
          } else {
            setLoggedIn(false);
          }
        } catch (error) {
          console.error("Error checking MetaMask connection:", error);
          setLoggedIn(false);
        }
      } else {
        setLoggedIn(false);
      }
    };

    checkMetaMaskConnection();
  }, [setLoggedIn, setUserAddress]);

  const handleLoginLogout = async () => {
    if (loggedIn) {
      alert("Reminder: To truly logout you need to disconnet the website from your MetaMask or other web3 provider as well.");
      setLoggedIn(false);
      setAccount(null);
      setUserAddress(''); // Clear address from context
      localStorage.removeItem('account');
      navigate('/');
    } else {
      if (!window.ethereum) {
        alert('MetaMask is not installed');
        return;
      }

      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const web3 = new Web3(window.ethereum);
        const accounts = await web3.eth.getAccounts();
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          setLoggedIn(true);
          setUserAddress(accounts[0]); // Update context
          localStorage.setItem('account', accounts[0]);
          navigate('/profile'); // Navigate to profile after successful login
        } else {
          alert('No accounts found');
        }
      } catch (error) {
        alert('Login failed: ' + error.message);
      }
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/">
          <img src={logo} alt="Logo" className="navbar-logo" />
        </Link>
        <Link to="/" className="navbar-title-link">
          <h1 className="navbar-title">BBLDrizzy.eth</h1>
        </Link>
      </div>
      <div className="navbar-right">
        <Link to="/buy" className="navbar-button-link">
          <button className="navbar-button">Buy</button>
        </Link>
        <Link to="/team" className="navbar-button-link">
          <button className="navbar-button">Team</button>
        </Link>
        <Link to="/roadmap" className="navbar-button-link">
          <button className="navbar-button">Roadmap</button>
        </Link>
        <Link to="/og_nft" className="navbar-button-link">
          <button className="navbar-button">NFT</button>
        </Link>
        <Link to="/staking" className="navbar-button-link">
          <button className="navbar-button">Staking</button>
        </Link>
        {!loggedIn && (
          <button className="navbar-button" onClick={handleLoginLogout}>
            Login
          </button>
        )}
        {loggedIn && (
          <>
            <Link to="/profile" className="navbar-button-link">
              <button className="navbar-button">Profile</button>
            </Link>
            <button className="navbar-button" onClick={handleLoginLogout}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
