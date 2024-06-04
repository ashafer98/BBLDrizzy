import { Component, OnInit } from '@angular/core';
import bbldContract from "../../services/Solidity/bbld.service";
import Web3 from 'web3'; 
import { Web3Service } from "src/app/services/Web3/web3.service";
import axios from 'axios';


@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.scss']
})
export class BuyComponent implements OnInit {
  
  constructor(private web3: Web3Service) { }
  
//ALCHEMY_API_URL = `https://eth-mainnet.alchemyapi.io/v2/${"gOxnxkaqiRhyacfJad_AzVwgJHcGDaCD"}`;
  userAddress: string = "";

  priceInEth: number = 0;
  purchaseAmount: number = 1;
  purchasePriceTotal: number = 0;
  isLoading: boolean = false;
  error: string = "";
  purchasePriceTotalDollars: string = "0";
  ethPriceInUSD: number = 0;


  async ngOnInit(): Promise<void> {

    await this.getContent();
    await this.getEthPriceInUSD();


  }

  async getContent() {
		this.priceInEth = Number(Web3.utils.fromWei(await bbldContract.methods.cost().call(), 'ether'))
    this.purchasePriceTotal = this.priceInEth * this.purchaseAmount

    //CALL API HERE TO get what 1ETH to $$ is equal too
    //times that buy this.purchasePriceTotal
    // and make it purchasepriceTotalIndollars

  }




  async purchaseToonForEth() {
    this.isLoading = true;
    this.error = "";
    try{
    let array = await this.web3.getAccounts();
    this.userAddress = array[0];
    await bbldContract.methods.buy(this.purchaseAmount).send({
      from: this.userAddress,
      value: Web3.utils.toWei(this.purchasePriceTotal.toString(), "ether")

    })
    this.isLoading = false;
    this.getContent();
    }catch(e){
      this.isLoading = false;
      this.error = e;
    }
  }



  updatePublicEthPrice(e: Event) {
    this.purchaseAmount = Number(e);
    this.purchasePriceTotal = parseFloat(
      (this.priceInEth * this.purchaseAmount).toFixed(10)
    );
    
    //this.purchasePriceTotalDollars = parseFloat(this.ethPriceInUSD * this.purchasePriceTotal).toFixed(10));

    this.purchasePriceTotalDollars = (this.ethPriceInUSD * this.purchasePriceTotal).toFixed(2);


  }

  //api call
   async getEthPriceInUSD() {
    try {
      const response = await axios.post((`https://eth-mainnet.alchemyapi.io/v2/${"gOxnxkaqiRhyacfJad_AzVwgJHcGDaCD"}`), {
        jsonrpc: '2.0',
        id: 1,
        method: 'eth_gasPrice',
        params: []
      });
  
      if (response.data && response.data.result) {
        const gasPriceInWei = parseInt(response.data.result, 16);
        const ethPriceInWei = gasPriceInWei / 1e18;
  
        // Fetch the current ETH/USD price from a reliable API
        const priceResponse = await axios.get('https://api.coinbase.com/v2/prices/ETH-USD/spot');
        this.ethPriceInUSD = priceResponse.data.data.amount;
  
        console.log(`Current ETH price in USD: $${this.ethPriceInUSD}`);
        this.purchasePriceTotalDollars = (this.ethPriceInUSD * this.purchasePriceTotal).toFixed(2);



      } else {
        console.error('Failed to retrieve gas price from Alchemy API');
      }
    } catch (error) {
      console.error('Error fetching data from Alchemy API', error);
    }
  }





}
