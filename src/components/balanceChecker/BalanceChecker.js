import { Network, TatumSDK } from "@tatumio/tatum";
import React, { useState } from "react";

export default function BalanceChecker() {
  const [address, setAddress] = useState("0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [balance, setBalance] = useState("");

  const getBalance = async () => {
    setLoading(true);
    setError(null);
    setBalance(null);
  
    const tatum = await TatumSDK.init({
      network: Network.ETHEREUM,
      apiKey: {
        v4: "t-66b038f4806fda001c7f3ccc-5f616ac1ebbc4ee7be7cf596" // Replace with your actual API key
      }
    });
  
    try {
      const bal = await tatum.address.getBalance({
        addresses: [address],
        tokenTypes: ["native"],
      });
  
      if (!bal || !bal.data || !bal.data[0]) {
        const err = bal.error && bal.error.message[0];
        setError(err || "Unknown error");
      } else {
        setBalance(`${bal.data[0].balance} ${bal.data[0].asset}`);
      }
    } catch (e) {
      setError(JSON.stringify(e));
    }
  
    tatum.destroy();
    setLoading(false);
  };

  return (
    <div className="container">
      <h1>Get Ethereum Wallet Balance</h1>
      <label>
        <div><b>Wallet address</b> (Default: Vitalik Buterin&apos;s address)</div>
        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
      </label>
      <button disabled={loading} onClick={getBalance}>GET BALANCE</button>
      <div className="result">
        {loading && <span id="loader"></span>}
        {balance && <h2 id="balance">{balance}</h2>}
        {error && <div id="error">{error}</div>}
      </div>
    </div>
  );
}
