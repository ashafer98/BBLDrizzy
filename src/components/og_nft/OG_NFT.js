import React, { useEffect, useState } from 'react';
import '../../index.css';
import logo from '../../assets/bbld/logo.png'; // Adjust the path if necessary
import bbldchar from '../../assets/bbld/bbld_char.jpg'; // Adjust the path if necessary
import { Link } from 'react-router-dom';
import { initializeTatum } from '../../services/bbldService'; // Adjust the path if necessary

function OG_NFT() {
  const [bbldCost, setBbldCost] = useState('Loading...');
  const [ethCost, setEthCost] = useState('Loading...');
  const [userOGCount, setUserOGCount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [purchaseLoading, setPurchaseLoading] = useState(false);
  const [buyWithBBLDLoading, setBuyWithBBLDLoading] = useState(false);
  const [userAllowance, setUserAllowance] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const BBLD_CONTRACT_ADDRESS = '0xDcBADc585a2b0216C2Fe01482AFf29B37ffbC119';
  const OG_NFT_CONTRACT_ADDRESS = '0x5886847A75feE2AcaCB87f6ae63B3aF1AB71B264';

  useEffect(() => {
    fetchCostsAndAllowance();
  }, []);

  const fetchCostsAndAllowance = async () => {
    const { web3, bbld_og_Instance, contractInstance } = await initializeTatum();

    const bbldCost = await bbld_og_Instance.methods.bbldPrice().call();
    const ethCostInWei = await bbld_og_Instance.methods.ethPrice().call();
    const ethCostFormatted = web3.utils.fromWei(ethCostInWei, 'ether');

    setBbldCost(bbldCost.toString());
    setEthCost(ethCostFormatted);

    const accounts = await web3.eth.getAccounts();
    if (accounts.length > 0) {
      const userAddress = accounts[0];
      const allowance = await contractInstance.methods.allowance(userAddress, OG_NFT_CONTRACT_ADDRESS).call();
      setUserAllowance(web3.utils.fromWei(allowance, 'ether'));
    }
  };

  const handleCheckOGCount = async () => {
    setLoading(true);
    setErrorMessage(''); // Reset error message
    try {
      const { web3, bbld_og_Instance } = await initializeTatum();
      const accounts = await web3.eth.getAccounts();

      if (accounts.length === 0) {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        fetchCostsAndAllowance(); // Fetch allowance and costs after connecting
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
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        fetchCostsAndAllowance(); // Fetch allowance and costs after connecting
      }

      const userAddress = accounts[0];
      await contractInstance.methods.approve(OG_NFT_CONTRACT_ADDRESS, web3.utils.toWei(bbldCost, 'ether')).send({
        from: userAddress,
      });

      alert("Allowance approved!");
      setUserAllowance(bbldCost); // Update user's allowance
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
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        fetchCostsAndAllowance(); // Fetch allowance and costs after connecting
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
      const { web3, bbld_og_Instance, contractInstance } = await initializeTatum();
      const accounts = await web3.eth.getAccounts();

      if (accounts.length === 0) {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        fetchCostsAndAllowance(); // Fetch allowance and costs after connecting
      }

      const userAddress = accounts[0];
      if (userAllowance < bbldCost) {
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

      <div style={{ marginBottom: '40px' }}>
        <p>This will be where the future OG NFT mint will take place once we have 100 holders.</p>
        <p>This will be an ERC1155 contract for our OG holders and will get special rewards for staking and future mints.</p>
        <p>ONE OG NFT PER WALLET!</p>

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

      {/* Explanation about Gas Fees */}
      <div style={{ marginBottom: '20px' }}>
        <p>Note: Buying with BBLD (an ERC20 token) requires two transactions—one to approve the allowance and another to buy the NFT. Each transaction will incur a gas fee. This is because ERC20 tokens require a separate approval step to allow the ERC1155 contract to spend tokens on behalf of the user. Conversely, buying with ETH requires only one transaction and one gas fee since the payment is made directly in ETH without needing an allowance.</p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '40px' }}>
        <div className='pretty-card' style={{ padding: '20px', boxShadow: '0px 0px 10px rgba(0,0,0,0.1)', borderRadius: '10px', width: '300px' }}>
          <img src={bbldchar} alt="bbld character" style={{ width: '100%', borderRadius: '10px' }} />
          <h2>OG NFT</h2>
          <p>Cost (ETH): {ethCost}</p>
          <p>Cost (BBLD): {bbldCost}</p>

          {userAllowance !== null ? (
            <p>Current Allowance: {userAllowance} BBLD</p>
          ) : (
            <button 
              className="button" 
              onClick={handleApproveAllowance} 
              disabled={buyWithBBLDLoading}
            >
              {buyWithBBLDLoading ? "Approving..." : "Approve Allowance"}
            </button>
          )}

          <button 
            className="button" 
            onClick={handleBuyWithBBLD} 
            disabled={buyWithBBLDLoading}
          >
            {buyWithBBLDLoading ? "Processing..." : "Buy With BBLD"}
          </button>
          
          <button 
            className="button" 
            onClick={handleBuyWithETH} 
            disabled={purchaseLoading}
          >
            {purchaseLoading ? "Processing..." : "Buy With ETH"}
          </button>
        </div>
      </div>

      {/* Styled Button for navigation */}
      <Link to="/">
        <button className="button">Back</button>
      </Link>
    </div>
  );
}

export default OG_NFT;
