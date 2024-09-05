import React, { useEffect, useState } from 'react';
import '../../index.css';
import logo from '../../assets/bbld/logo.png'; // Adjust the path if necessary
import bbldchar from '../../assets/bbld/bbld_char.jpg'; // Adjust the path if necessary
import { Link } from 'react-router-dom';
import { initializeTatum } from '../../services/bbldService'; // Adjust the path if necessary

function OG_NFT() {
  const [bbldCost, setBbldCost] = useState('Loading...');
  const [ethCost, setEthCost] = useState('Loading...');
  const [userOGCount, setUserOGCount] = useState(null); // Initialize as null to indicate it hasn't been fetched yet
  const [loading, setLoading] = useState(false); // To manage loading state
  const [purchaseLoading, setPurchaseLoading] = useState(false); // To manage loading state for purchase
  const [buyWithBBLDLoading, setBuyWithBBLDLoading] = useState(false); // To manage loading state for BBLD purchase

  useEffect(() => {
    async function fetchCosts() {
      const { web3, bbld_og_Instance } = await initializeTatum();

      const bbldCost = await bbld_og_Instance.methods.bbldPrice().call();
      const ethCostInWei = await bbld_og_Instance.methods.ethPrice().call();

      const ethCostFormatted = web3.utils.fromWei(ethCostInWei, 'ether'); // Convert from wei to ETH

      setBbldCost(bbldCost.toString());
      setEthCost(ethCostFormatted);
    }

    fetchCosts();
  }, []);

  const handleCheckOGCount = async () => {
    setLoading(true);
    try {
      const { web3, bbld_og_Instance } = await initializeTatum();
      const accounts = await web3.eth.getAccounts();

      if (accounts.length === 0) {
        setUserOGCount("No Web3 provider found.");
      } else {
        const userAddress = accounts[0];
        const userOGBalance = await bbld_og_Instance.methods.balanceOf(userAddress, 1).call(); // Assuming token ID is 1
        setUserOGCount(userOGBalance);
      }
    } catch (error) {
      console.error("Error fetching OG NFT count:", error);
      setUserOGCount("Error fetching OG NFT count.");
    } finally {
      setLoading(false);
    }
  };

  const handleBuyWithETH = async () => {
    setPurchaseLoading(true);
    try {
      const { web3, bbld_og_Instance } = await initializeTatum();
      const accounts = await web3.eth.getAccounts();

      if (accounts.length === 0) {
        alert("No Web3 provider found. Please connect your wallet.");
        return;
      }

      const userAddress = accounts[0];
      const ethCostInWei = web3.utils.toWei(ethCost, 'ether'); // Convert ETH cost to wei

      await bbld_og_Instance.methods.buyWithETH(1).send({
        from: userAddress,
        value: ethCostInWei,
      });

      alert("Purchase successful!");
      handleCheckOGCount(); // Update the user's OG NFT count after purchase
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
        alert("No Web3 provider found. Please connect your wallet.");
        return;
      }

      const userAddress = accounts[0];

      // Approve the contract to spend BBLD on the user's behalf
      await contractInstance.methods.approve(bbld_og_Instance.options.address, bbldCost).send({
        from: userAddress,
      });

      // Buy the NFT with BBLD
      await bbld_og_Instance.methods.buyWithBBLD(1).send({
        from: userAddress,
      });

      alert("Purchase successful!");
      handleCheckOGCount(); // Update the user's OG NFT count after purchase
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
        {userOGCount !== null && (
          <h1>{typeof userOGCount === 'string' ? userOGCount : `You Own: ${userOGCount} OG NFTs`}</h1>
        )}
      </div>

      {/* Centering the pretty card */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '40px' }}>
        <div className='pretty-card' style={{ padding: '20px', boxShadow: '0px 0px 10px rgba(0,0,0,0.1)', borderRadius: '10px', width: '300px' }}>
          <img src={bbldchar} alt="BBLD char" style={{ maxWidth: '100%', height: 'auto', objectFit: 'contain', marginBottom: '20px' }} />
          <p>Cost: {bbldCost} BBLD</p>
          <p>Cost: {ethCost} ETH</p>

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

      <Link to="/">
        <button className="button">Back</button>
      </Link>
    </div>
  );
}

export default OG_NFT;
