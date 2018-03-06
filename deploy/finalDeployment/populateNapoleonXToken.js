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

console.log(account);

var napoleonxTokenAbi = [
    {
      "constant": true,
      "inputs": [],
      "name": "name",
      "outputs": [
        {
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_spender",
          "type": "address"
        },
        {
          "name": "_value",
          "type": "uint256"
        }
      ],
      "name": "approve",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "totalSupply",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_from",
          "type": "address"
        },
        {
          "name": "_to",
          "type": "address"
        },
        {
          "name": "_value",
          "type": "uint256"
        }
      ],
      "name": "transferFrom",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "INITIAL_SUPPLY",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "decimals",
      "outputs": [
        {
          "name": "",
          "type": "uint8"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_spender",
          "type": "address"
        },
        {
          "name": "_subtractedValue",
          "type": "uint256"
        }
      ],
      "name": "decreaseApproval",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_owner",
          "type": "address"
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "name": "balance",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "symbol",
      "outputs": [
        {
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_to",
          "type": "address"
        },
        {
          "name": "_value",
          "type": "uint256"
        }
      ],
      "name": "transfer",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_spender",
          "type": "address"
        },
        {
          "name": "_addedValue",
          "type": "uint256"
        }
      ],
      "name": "increaseApproval",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_owner",
          "type": "address"
        },
        {
          "name": "_spender",
          "type": "address"
        }
      ],
      "name": "allowance",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "spender",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Approval",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "to",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Transfer",
      "type": "event"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "whitelisted",
          "type": "address[50]"
        },
        {
          "name": "tokenAmount",
          "type": "uint256[50]"
        }
      ],
      "name": "populateWhitelisted",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    }
];

var napoleonXTokenAddress = "0x9fbda871d559710256a2502a2517b794b482db40";
web3.personal.unlockAccount(account, unlockingPassword);

var napoleonXTokenContract = web3.eth.contract(napoleonxTokenAbi);
var napoleonXToken = napoleonXTokenContract.at(napoleonXTokenAddress);

console.log(napoleonXToken.name());

whitelisted = [
"0x17F2Bc4248D33B74319f4f02b75132e352Db20c7",
"0x22e2a2bf31257F767870Ff5EFFEa52cd77ab7fc4",
"0x87379c15810e77502e436ab8f06794cc662d39a5",
"0x4878cA9777C5915B47bf5Fd8837667E1ff1A0eC9",
"0x3B94CB394fBCA3177D7E45950e5C65b1B03420BF",
"0x7F7cD082A08823e88b7935A79860513841c4e65F",
"0xDBB936102a9308a6f98dc889a2580fdbD8Fec059"
];

tokenAmount = [
10,
10,
10,
10,
10,
10,
10
];

var napoleonXtokenPopulateData=napoleonXToken.populateWhitelisted.getData(whitelisted,tokenAmount);
var napoleonXtokenPopulateDataEstimate = web3.eth.estimateGas({from : account, to : napoleonXTokenAddress, data: napoleonXtokenPopulateData});
console.log(napoleonXtokenPopulateDataEstimate);
var napoleonXtokenPopulateDataEstimate = Math.min(web3.eth.getBlock("latest").gasLimit,napoleonXtokenPopulateDataEstimate);
console.log(napoleonXtokenPopulateDataEstimate);

var populateWhiteList_transaction = napoleonXToken.populateWhitelisted.sendTransaction(whitelisted,tokenAmount, {
        from: account,
        gas: napoleonXtokenPopulateDataEstimate
});
console.log("@bcTransaction@"+populateWhiteList_transaction);
var MyPopulateWhiteListReceipt = web3.eth.getTransactionReceiptMined(populateWhiteList_transaction);


var arrayLength = protagonists.length;
for (var i = 0; i < arrayLength; i++) {
      console.log("committing protagonist : ")
      console.log(protagonists[i]);
      var commiment_transaction = napxGreenlistContractInstance.registerCommitment.sendTransaction(
      protagonists[i],
      web3.toWei(10+10*i, "ether"),
       {
        from: account,
        gas: 1000000
      });
      console.log(commiment_transaction);
//      var MyExecutionReceipt = web3.eth.getTransactionReceiptMined(execution_transaction);
}

for (var i = 0; i < arrayLength; i++) {
      console.log("committing protagonist : ")
      console.log(protagonists[i]);
      var commitment_protagonist = napxGreenlistContractInstance.commitmentOf(protagonists[i]);
      console.log(commitment_protagonist);
//      var MyExecutionReceipt = web3.eth.getTransactionReceiptMined(execution_transaction);
}
