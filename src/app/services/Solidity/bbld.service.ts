import { Injectable } from '@angular/core';
const contract = require("../../../../solidity/coin/bbld.json");
const Web3 = require('web3');
//testNet const provider = new Web3('https://mainnet.infura.io/v3/589e31a14b0c42b78400756b023d7894');
const provider = new Web3('https://eth-mainnet.g.alchemy.com/v2/gOxnxkaqiRhyacfJad_AzVwgJHcGDaCD');
// const provider = new Web3('https://goerli.infura.io/v3/589e31a14b0c42b78400756b023d7894');
//Binanace test net

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  constructor() { }
}

provider.eth.setProvider(Web3.givenProvider);

  //  0x435dd9C7ADAcd74c666Cc00CD5Ca57452d1642B3 // test $TOON contract MAIN NET

const bbldContract = new provider.eth.Contract(
  (contract),
  "0xdcbadc585a2b0216c2fe01482aff29b37ffbc119" //0xdcbadc585a2b0216c2fe01482aff29b37ffbc119
);

console.log(provider)


export default bbldContract;
