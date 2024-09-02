import React, { useState, useEffect } from 'react';
import '../../index.css';
import logo from '../../assets/bbld/logo.png'; // Adjust the path if necessary
import coin from '../../assets/bbld/coin.gif'
import { initializeTatum } from '../../services/bbldService'; // Import the function
import { Link } from 'react-router-dom';

function Buy() {
  const [amount, setAmount] = useState(1);
  const [totalCostInEth, setTotalCost] = useState('0');
  const [initialCostInEth, setInitialCostInEth] = useState('0');
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

        // Calculate initial cost
        const cost = await contractInstance.methods.cost().call();
        const initialCostInEth = web3.utils.fromWei(cost.toString(), 'ether');
        setTotalCost((initialCostInEth * amount).toString());
        setInitialCostInEth(initialCostInEth);
      } catch (error) {
        setErrorMessage('Initialization failed: ' + error.message);
      }
    }

    init();
  }, [amount]); // Re-run when `amount` changes

  const handleAmountChange = async (event) => {
    let newAmount = event.target.value;
    // Ensure newAmount is a valid number, otherwise reset to 1
    if (!/^\d+$/.test(newAmount)) {
      setAmount(1);
      return;
    }

    // Parse newAmount to an integer and ensure it's at least 1
    newAmount = Math.max(1, parseInt(newAmount));
    setAmount(newAmount);

    if (web3 && contractInstance) {
      try {
        const cost = await contractInstance.methods.cost().call();
        const totalCostInEth = web3.utils.fromWei(cost.toString(), 'ether');
        setTotalCost((totalCostInEth * newAmount).toString());
      } catch (error) {
        setErrorMessage('Failed to fetch cost: ' + error.message);
      }
    }
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
      if (accounts.length === 0) {
        setErrorMessage('No accounts found');
        return;
      }

      const totalCost = web3.utils.toWei((totalCostInEth).toString(), 'ether'); // Convert total cost to Wei

      // Send the transaction
      await contractInstance.methods.buy(amount).send({ from: accounts[0], value: totalCost });

      setSuccessMessage('Transaction successful!');
    } catch (error) {
      setErrorMessage('Transaction failed: ' + error.message);
    }
  }

  return (
    <div className="main-container">
      <img src={logo} alt="BBLD Logo" className="logo" />
      <h2>Buy BBLD Tokens</h2>
      <p>
        Welcome to the BBLD Project! The meme coin that’s got more lift than Drizzy's Brazilian butt lift! By owning BBLD, you're joining the coolest community in crypto.
      </p>
      <p>
        To buy BBLD tokens, select the amount below and click the button. Make sure you have your wallet connected and enough ETH for the transaction.
      </p>
      <a href="https://etherscan.io/token/0xdcbadc585a2b0216c2fe01482aff29b37ffbc119" target="_blank" rel="noopener noreferrer">
          <button className="button">View Contract</button>
        </a>

      <div className='pretty-cards'>
        <div className='pretty-card'>
          <p>Price : {initialCostInEth} ETH</p>
          <img src={coin} alt="BBLD" style={{ maxWidth: '50vh', height: 'auto', objectFit: 'contain' }} />

          <div className="number-input-container">
            <button
              className="arrow-button"
              onClick={() => setAmount((prevAmount) => Math.max(1, prevAmount - 1))}
            >
              &lt;
            </button>
            <input
              type="number"
              min="1"
              max="1000000"
              value={amount}
              onChange={handleAmountChange}
              className="input-number"
            />
            <button
              className="arrow-button"
              onClick={() => setAmount((prevAmount) => Math.max(1, prevAmount + 1))}
            >
              &gt;
            </button>
          </div>

          <div className="slider-container">
            <input
              type="range"
              min="1"
              max="1000000"
              value={amount}
              onChange={handleAmountChange}
              className="input-slider"
            />
          </div>
          <span>{amount} BBLD</span>
          <p style={{ textAlign: 'center' }}>Cost: {totalCostInEth} ETH</p>
          <button className="button" onClick={handleBuy}>
            Buy {amount} BBLD
          </button>
        </div>
      </div>
      <Link to="/">
        <button className="button">Back</button>
      </Link>

      {errorMessage && <p className="error-message">{errorMessage} <br></br>Please check your MetaMask or other web3 provider.</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
    </div>
  );
}

export default Buy;
