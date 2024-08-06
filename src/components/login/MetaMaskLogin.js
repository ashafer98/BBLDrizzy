import React, { useState } from 'react';
import Web3 from 'web3';

const MetaMaskLogin = ({ setLoggedIn }) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [account, setAccount] = useState(null);

  const handleLogin = async () => {
    if (!window.ethereum) {
      setErrorMessage('MetaMask is not installed');
      return;
    }

    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const web3 = new Web3(window.ethereum);
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);
      setLoggedIn(true);
    } catch (error) {
      setErrorMessage('Login failed: ' + error.message);
    }
  };

  return (
    <div className="login">
      <button onClick={handleLogin}>Login with MetaMask</button>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {account && <p className="success-message">Logged in as {account}</p>}
    </div>
  );
};

export default MetaMaskLogin;
