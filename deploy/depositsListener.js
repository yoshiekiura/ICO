var Web3 = require('web3');
if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}
if (!web3.isConnected()) {
    console.error("Ethereum - no conection to RPC server");
} else {
    console.log("Ethereum - connected to RPC server");
}

web3.eth.getTransactionReceiptMined = require("./getTransactionReceiptMined.js");

var account = web3.eth.accounts[0];
var BigNumber = require('bignumber.js');
var util = require("./serveurUtil.js");

var kycICOAddress = "0xD2330863DC0d4D4571Fcdc851FEDE2AF95815D66";
web3.personal.unlockAccount(account, unlockingPassword,1000);
var kycICOABI = [{
    "constant": false,
    "inputs": [{
        "name": "_clearedAddress",
        "type": "address"
    }],
    "name": "clearKyc",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "oracleAddress",
    "outputs": [{
        "name": "",
        "type": "address"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": true,
    "inputs": [{
        "name": "",
        "type": "address"
    }],
    "name": "kycClearances",
    "outputs": [{
        "name": "",
        "type": "bool"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{
        "name": "_oracleAddress",
        "type": "address"
    }],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor"
}, {
    "payable": true,
    "stateMutability": "payable",
    "type": "fallback"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": true,
        "name": "_clearedAddress",
        "type": "address"
    }, {
        "indexed": false,
        "name": "clearanceTimestamp",
        "type": "uint256"
    }],
    "name": "kycCleared",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": true,
        "name": "_clearedAddress",
        "type": "address"
    }, {
        "indexed": false,
        "name": "depositValue",
        "type": "uint256"
    }, {
        "indexed": false,
        "name": "depositTimestamp",
        "type": "uint256"
    }],
    "name": "kycAddressDeposited",
    "type": "event"
}];
//var kycICOABI = [{"constant":false,"inputs":[],"name":"chaineumVote","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_destWallet","type":"address"}],"name":"setDestinationWallet","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"legalVote","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"legalVoted","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"projectOwnerVote","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"projectOwnerVoted","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"destinationWallet","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_clearedAddress","type":"address"}],"name":"clearKyc","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"projectOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"oracleAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"chaineum","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"kycClearances","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"legal","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"chaineumVoted","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_oracle","type":"address"},{"name":"_legal","type":"address"},{"name":"_projectOwner","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_voter","type":"address"},{"indexed":false,"name":"_voteTimestamp","type":"uint256"}],"name":"Voted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"trigerredBy","type":"address"},{"indexed":false,"name":"amountWithdrawn","type":"uint256"},{"indexed":false,"name":"withdrawTimestamp","type":"uint256"}],"name":"Withdrawed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_clearedAddress","type":"address"},{"indexed":false,"name":"clearanceTimestamp","type":"uint256"}],"name":"kycCleared","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_clearedAddress","type":"address"},{"indexed":false,"name":"depositValue","type":"uint256"},{"indexed":false,"name":"depositTimestamp","type":"uint256"}],"name":"kycAddressDeposited","type":"event"}];
var kycICOContract = web3.eth.contract(kycICOABI);
var kycICO = kycICOContract.at(kycICOAddress);

console.log(kycICO.oracleAddress());

var myDepositors = kycICO.kycAddressDeposited(null,{fromBlock: 0, toBlock: 'latest'});

myDepositors.get(function(error, depositLogs){
    if(!error){
        for (var newRecordIndex=0; newRecordIndex<depositLogs.length; newRecordIndex++){
            var myPastDeposit = depositLogs[newRecordIndex];
			console.log(newRecordIndex+"@clearedAddress@"+myPastDeposit.args._clearedAddress);
			console.log(newRecordIndex+"@depositValue@"+myPastDeposit.args.depositValue);
			console.log(newRecordIndex+"@depositTimestamp@"+myPastDeposit.args.depositTimestamp);
        }
    }
});
