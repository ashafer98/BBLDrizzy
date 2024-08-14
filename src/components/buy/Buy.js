import React, { useState, useEffect } from 'react';
import '../../index.css';
import logo from '../../assets/bbld/top_page_logo.png'; // Adjust the path if necessary
import { initializeTatum } from '../../services/bbldService'; // Import the function
import { Link } from 'react-router-dom';

function Buy() {
  const [amount, setAmount] = useState(1);
  const [costInEther, setCostInEther] = useState('0');
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
        const initialCostInEther = web3.utils.fromWei(cost.toString(), 'ether');
        setCostInEther((initialCostInEther * amount).toString());
      } catch (error) {
        setErrorMessage('Initialization failed: ' + error.message);
      }
    }

    init();
  }, [amount]); // Re-run when `amount` changes

  const handleAmountChange = async (event) => {
    const newAmount = event.target.value;
    setAmount(newAmount);

    if (web3 && contractInstance) {
      try {
        const cost = await contractInstance.methods.cost().call();
        const costInEther = web3.utils.fromWei(cost.toString(), 'ether');
        setCostInEther((costInEther * newAmount).toString());
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
      const account = accounts[0];

      // Fetch the cost from the contract
      const cost = await contractInstance.methods.cost().call();
      const totalCost = web3.utils.toWei((costInEther * amount).toString(), 'ether'); // Convert total cost to Wei

      // Send the transaction
      const tx = await contractInstance.methods.buy(amount).send({ from: account, value: totalCost });

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
          max="1000000"
          value={amount}
          onChange={handleAmountChange}
          className="slider"
        />
        <span>{amount} BBLD</span>
      </div>
      <p>Cost: {costInEther} ETH</p>
      <button className="button" onClick={handleBuy}>
        Buy {amount} BBLD
      </button>
      <Link to="/">
          <button className="button">Back</button>
      </Link>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
    </div>
  );
}

export default Buy;
