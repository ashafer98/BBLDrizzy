import Web3 from 'web3';
import { Network, TatumSDK } from '@tatumio/tatum';
import { BBLD_ABI } from './BBLD_ABI.js'; // Adjust the path if necessary
import { BBLD_OG_ABI } from './BBLD_OG_ABI.js'; // Adjust the path if necessary

const API_KEY = "t-66b038f4806fda001c7f3ccc-5f616ac1ebbc4ee7be7cf596"; // Replace with your actual API key
const CONTRACT_ADDRESS = "0xDcBADc585a2b0216C2Fe01482AFf29B37ffbC119";
const BBLD_OG__ADDRESS = "0x5886847A75feE2AcaCB87f6ae63B3aF1AB71B264";

export async function initializeTatum() {
  const web3 = new Web3(window.ethereum);
  const tatum = await TatumSDK.init({
    network: Network.ETHEREUM,
    apiKey: { v4: API_KEY },
  });

  const contractInstance = new web3.eth.Contract(BBLD_ABI, CONTRACT_ADDRESS);
  const bbld_og_Instance = new web3.eth.Contract(BBLD_OG_ABI, BBLD_OG__ADDRESS);

  return { web3, contractInstance, bbld_og_Instance };
}
