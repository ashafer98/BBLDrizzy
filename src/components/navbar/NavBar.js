import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Web3 from 'web3';
import './NavBar.css';
import logo from '../../assets/bbld/Main_Logo.png'; // Import the image

function Navbar({ loggedIn, setLoggedIn }) {
  const [account, setAccount] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkMetaMaskConnection = async () => {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        try {
          const accounts = await web3.eth.getAccounts();
          if (accounts.length > 0) {
            setAccount(accounts[0]);
            setLoggedIn(true);
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
  }, [setLoggedIn]);

  const handleLoginLogout = async () => {
    if (loggedIn) {
      // Handle logout
      setLoggedIn(false);
      setAccount(null);
      clearAccountFromLocalStorage();
      navigate('/');
    } else {
      // Handle login
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
          saveAccountToLocalStorage(accounts[0]);
        } else {
          alert('No accounts found');
        }
      } catch (error) {
        alert('Login failed: ' + error.message);
      }
    }
  };

  const saveAccountToLocalStorage = (account) => {
    localStorage.setItem('account', account);
  };

  const clearAccountFromLocalStorage = () => {
    localStorage.removeItem('account');
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
