// src/components/buy/Buy.js
import React, { useState, useEffect } from 'react';
import './Buy.css';
import logo from '../../assets/bbld/top_page_logo.png'; // Adjust the path if necessary
import { initializeTatum } from '../../services/bbldService'; // Import the function

function Buy() {
  const [amount, setAmount] = useState(1);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [web3, setWeb3] = useState(null);
  const [contractInstance, setContractInstance] = useState(null);

  useEffect(() => {
    async function init() {
      try {
        const { web3, contractInstance } = await initializeTatum();
        setWeb3(web3);
        setContractInstance(contractInstance);
      } catch (error) {
        setErrorMessage('Initialization failed: ' + error.message);
      }
    }

    init();
  }, []);

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  async function handleBuy() {
    if (!window.ethereum) {
      setErrorMessage('MetaMask is not installed');
      return;
    }

    if (!web3 || !contractInstance) {
      setErrorMessage('Web3 or contract instance is not initialized');
      return;
    }

    try {
      // Request account access if needed
      await window.ethereum.request({ method: 'eth_requestAccounts' });

      // Get accounts from MetaMask
      const accounts = await web3.eth.getAccounts();
      const account = accounts[0];

      // Fetch the cost from the contract
      const cost = await contractInstance.methods.cost().call();
      const totalCost = web3.utils.toWei((cost * amount).toString(), 'ether'); // Convert cost to Wei

      // Send the transaction
      await contractInstance.methods.buy(amount).send({ from: account, value: totalCost });

      setSuccessMessage('Transaction successful!');
    } catch (error) {
      setErrorMessage('Transaction failed: ' + error.message);
    }
  }

  return (
    <div className="buy">
      <img src={logo} alt="BBLD Logo" className="buy-logo" />
      <h2>Buy BBLD Tokens</h2>
      <p>
        Welcome to the BBLD Project! The meme coin that’s got more lift than Drizzy's Brazilian butt lift! By owning BBLD, you're joining the coolest community in crypto.
      </p>
      <p>
        To buy BBLD tokens, select the amount below and click the button. Make sure you have your wallet connected and enough ETH for the transaction.
      </p>
      <div className="slider-container">
        <input
          type="range"
          min="1"
          max="100"
          value={amount}
          onChange={handleAmountChange}
          className="slider"
        />
        <span>{amount} BBLD</span>
      </div>
      <button className="buy-button" onClick={handleBuy}>
        Buy {amount} BBLD Tokens
      </button>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
    </div>
  );
}

export default Buy;
