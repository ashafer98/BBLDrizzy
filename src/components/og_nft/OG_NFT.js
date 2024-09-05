import React, { useEffect, useState } from 'react';
import '../../index.css';
import logo from '../../assets/bbld/logo.png'; // Adjust the path if necessary
import bbldchar from '../../assets/bbld/bbld_char.jpg'; // Adjust the path if necessary
import { Link } from 'react-router-dom';
import { initializeTatum } from '../../services/bbldService'; // Adjust the path if necessary
import openSeaIcon from '../../assets/openSea.png'; // Adjust the path if necessary
import raribleIcon from '../../assets/rarible.png'; // Adjust the path if necessary

function OG_NFT() {
  const [bbldCost, setBbldCost] = useState('Loading...');
  const [ethCost, setEthCost] = useState('Loading...');
  const [userOGCount, setUserOGCount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [purchaseLoading, setPurchaseLoading] = useState(false);
  const [buyWithBBLDLoading, setBuyWithBBLDLoading] = useState(false);
  const [userAllowance, setUserAllowance] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const OG_NFT_CONTRACT_ADDRESS = '0x5886847A75feE2AcaCB87f6ae63B3aF1AB71B264';

  useEffect(() => {
    checkConnectionAndFetchData();
  }, []);

  const checkConnectionAndFetchData = async () => {
    try {
      const { web3, bbld_og_Instance, contractInstance } = await initializeTatum();
      const accounts = await web3.eth.getAccounts();

      if (accounts.length > 0) {
        setIsConnected(true);
        setErrorMessage(''); // Clear error message on successful connection
        const userAddress = accounts[0];
        const bbldCost = await bbld_og_Instance.methods.bbldPrice().call();
        const ethCostInWei = await bbld_og_Instance.methods.ethPrice().call();
        const ethCostFormatted = web3.utils.fromWei(ethCostInWei, 'ether');

        setBbldCost(bbldCost.toString());
        setEthCost(ethCostFormatted);

        const allowance = await contractInstance.methods.allowance(userAddress, OG_NFT_CONTRACT_ADDRESS).call();
        setUserAllowance(web3.utils.fromWei(allowance, 'wei'));
        handleCheckOGCount(); // Refresh inventory on successful connection
      } else {
        setIsConnected(false);
        setBbldCost('Loading...');
        setEthCost('Loading...');
        setUserAllowance(null);
      }
    } catch (error) {
      console.error("Error checking connection and fetching data:", error);
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  const handleConnect = async () => {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      checkConnectionAndFetchData(); // Fetch data after connecting
    } catch (error) {
      console.error("Error connecting MetaMask:", error);
      setErrorMessage("Failed to connect to MetaMask. Please try again.");
    }
  };

  const handleCheckOGCount = async () => {
    setLoading(true);
    setErrorMessage(''); // Reset error message
    try {
      const { web3, bbld_og_Instance } = await initializeTatum();
      const accounts = await web3.eth.getAccounts();

      if (accounts.length === 0) {
        await handleConnect();
        return; // Return to prevent further processing if not connected
      }

      const userAddress = accounts[0];
      const userOGBalance = await bbld_og_Instance.methods.balanceOf(userAddress, 1).call();
      setUserOGCount(userOGBalance);
    } catch (error) {
      console.error("Error fetching OG NFT count:", error);
      setErrorMessage("Error fetching OG NFT count. Please connect your wallet.");
      setUserOGCount(null);
    } finally {
      setLoading(false);
    }
  };

  const handleApproveAllowance = async () => {
    setBuyWithBBLDLoading(true);
    try {
      const { web3, contractInstance } = await initializeTatum();
      const accounts = await web3.eth.getAccounts();

      if (accounts.length === 0) {
        await handleConnect();
        return; // Return to prevent further processing if not connected
      }

      const userAddress = accounts[0];
      await contractInstance.methods.approve(OG_NFT_CONTRACT_ADDRESS, web3.utils.toWei(bbldCost, 'ether')).send({
        from: userAddress,
      });

      alert("Allowance approved!");
      // Refresh the allowance and inventory after approval
      const allowance = await contractInstance.methods.allowance(userAddress, OG_NFT_CONTRACT_ADDRESS).call();
      setUserAllowance(web3.utils.fromWei(allowance, 'wei'));
      handleCheckOGCount(); // Refresh inventory after approval
    } catch (error) {
      console.error("Error approving allowance:", error);
      alert("Error approving allowance. Please try again.");
    } finally {
      setBuyWithBBLDLoading(false);
    }
  };

  const handleBuyWithETH = async () => {
    setPurchaseLoading(true);
    try {
      const { web3, bbld_og_Instance } = await initializeTatum();
      const accounts = await web3.eth.getAccounts();

      if (accounts.length === 0) {
        await handleConnect();
        return; // Return to prevent further processing if not connected
      }

      const userAddress = accounts[0];
      const ethCostInWei = web3.utils.toWei(ethCost, 'ether');

      await bbld_og_Instance.methods.buyWithETH(1).send({
        from: userAddress,
        value: ethCostInWei,
      });

      alert("Purchase successful!");
      handleCheckOGCount(); // Refresh inventory after purchase
    } catch (error) {
      console.error("Error during purchase:", error);
      alert("Error during purchase. Please try again.");
    } finally {
      setPurchaseLoading(false);
    }
  };

  const handleBuyWithBBLD = async () => {
    setBuyWithBBLDLoading(true);
    try {
      const { web3, bbld_og_Instance } = await initializeTatum();
      const accounts = await web3.eth.getAccounts();

      if (accounts.length === 0) {
        await handleConnect();
        return; // Return to prevent further processing if not connected
      }

      const userAddress = accounts[0];
      if (parseFloat(userAllowance) < parseFloat(bbldCost)) {
        alert("Insufficient allowance. Please approve the allowance first.");
        return;
      }

      await bbld_og_Instance.methods.buyWithBBLD(1).send({
        from: userAddress,
      });

      alert("Purchase successful!");
      handleCheckOGCount(); // Refresh inventory after purchase
    } catch (error) {
      console.error("Error during purchase with BBLD:", error);
      alert("Error during purchase with BBLD. Please try again.");
    } finally {
      setBuyWithBBLDLoading(false);
    }
  };

  return (
    <div className="main-container" style={{ textAlign: 'center' }}>
      <img src={logo} alt="BBLD Logo" className="logo" />
      <h2>OG NFT</h2>
      <h2>Only 100 available</h2>
      <h2>One mint per wallet!</h2>
      <div>
        <a href="https://opensea.io/collection/unidentified-contract-9fa9ef06-7b51-4ef6-abad-fa9d" target="_blank" rel="noopener noreferrer">
          <img src={openSeaIcon} alt="OpenSea" style={{ width: '24px', height: '24px', marginRight: '10px' }} />
        </a>
        <a href="https://rarible.com/collection/0x5886847a75fee2acacb87f6ae63b3af1ab71b264/items" target="_blank" rel="noopener noreferrer">
          <img src={raribleIcon} alt="Rarible" style={{ width: '24px', height: '24px' }} />
        </a>
      </div>


      <p>
        Welcome to BBLD OG, the genesis collection that celebrates the first wave of believers in the BBLD community. These NFTs aren’t just collectibles—they’re your key to the future of BBLD, with only 100 unique pieces available.<br /><br />
        VIP Status: As a BBLD OG owner, you’re not just part of the community—you’re at its core. This NFT grants you insider status, ensuring you’re always ahead of the game.<br /><br />
        Join the BBLD OG ranks and unlock a future full of benefits, rewards, and exclusive opportunities. This is more than just an NFT—it’s your passport to the BBLD universe.
      </p>

      <div style={{ marginBottom: '40px' }}>
        <a href="https://etherscan.io/address/0x5886847A75feE2AcaCB87f6ae63B3aF1AB71B264" target="_blank" rel="noopener noreferrer">
          <button className="button">View Contract</button></a>

        <button
          className="button"
          onClick={handleCheckOGCount}
          disabled={loading}
        >
          {loading ? "Checking..." : "View your Inventory"}
        </button>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        {userOGCount !== null && (
          <h1>{typeof userOGCount === 'string' ? userOGCount : `You Own: ${userOGCount} OG NFTs`}</h1>
        )}
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '40px' }}>
        <div className='pretty-card' style={{ padding: '20px', boxShadow: '0px 0px 10px rgba(0,0,0,0.1)', borderRadius: '10px', width: '300px' }}>
          <img src={bbldchar} alt="bbld character" style={{ width: '100%', borderRadius: '10px' }} />
          <h2>OG NFT</h2>
          <div>
            <a href="https://opensea.io/collection/unidentified-contract-9fa9ef06-7b51-4ef6-abad-fa9d" target="_blank" rel="noopener noreferrer">
              <img src={openSeaIcon} alt="OpenSea" style={{ width: '24px', height: '24px', marginRight: '10px' }} />
            </a>
            <a href="https://rarible.com/collection/0x5886847a75fee2acacb87f6ae63b3af1ab71b264/items" target="_blank" rel="noopener noreferrer">
              <img src={raribleIcon} alt="Rarible" style={{ width: '24px', height: '24px' }} />
            </a>
          </div>

          <br></br>

          <p> Why BBLD OG?<br /><br />
            Exclusive Perks: BBLD OG holders are in for a treat! Enjoy access to special perks, including staking rewards, exclusive drops, and early access to new BBLD releases.</p>
          {isConnected && (
            <div>
              <br />
              <p>Cost (ETH): {ethCost}</p>
              <p>Cost (BBLD): {bbldCost}</p>
              <p>Current Allowance: {userAllowance} BBLD</p>
              <br />
              {userOGCount !== null && parseInt(userOGCount) > 0 ? (
                <>You already own 1 OG NFT. Only 1 per wallet.</>
              ) : (
                <>
                  {/* First handle the BBLD logic */}
                  {userAllowance !== null && parseFloat(userAllowance) >= parseFloat(bbldCost) ? (
                    <button
                      className="button"
                      onClick={handleBuyWithBBLD}
                      disabled={buyWithBBLDLoading}
                    >
                      {buyWithBBLDLoading ? "Processing..." : "Buy With BBLD"}
                    </button>
                  ) : (
                    <>
                      <p>You currently do not have enough allowance. Please approve BBLD allowance to buy with BBLD.</p>
                      <button
                        className="button"
                        onClick={handleApproveAllowance}
                        disabled={buyWithBBLDLoading}
                      >
                        {buyWithBBLDLoading ? "Approving..." : "Approve Allowance"}
                      </button>
                    </>
                  )}

                  {/* Now show the Buy with ETH button below */}
                  <button
                    className="button"
                    onClick={handleBuyWithETH}
                    disabled={purchaseLoading}
                  >
                    {purchaseLoading ? "Processing..." : "Buy With ETH"}
                  </button>
                </>
              )}
            </div>
          )}

          {!isConnected && (
            <button
              className="button"
              onClick={handleConnect}
            >
              Connect
            </button>
          )}
        </div>
      </div>
      {/* Explanation about Gas Fees */}
      <div style={{ marginBottom: '20px' }}>
        <p>Note: Buying with BBLD (an ERC20 token) requires two transactions—one to approve the allowance and another to buy the NFT. Each transaction will incur a gas fee. This is because ERC20 tokens require a separate approval step to allow the ERC1155 contract to spend tokens on behalf of the user. <br>
        </br>Conversely, buying with ETH requires only one transaction and one gas fee since the payment is made directly in ETH without needing an allowance.</p>
      </div>

      {/* Styled Button for navigation */}
      <Link to="/">
        <button className="button">Back</button>
      </Link>
    </div>
  );
}

export default OG_NFT;
