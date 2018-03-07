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
      "constant": true,
      "inputs": [],
      "name": "endTime",
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
      "inputs": [
        {
          "name": "setEndTime",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "investor",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "tokenAmount",
          "type": "uint256"
        }
      ],
      "name": "TokenAllocated",
      "type": "event"
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
          "type": "address[]"
        },
        {
          "name": "tokenAmount",
          "type": "uint256[]"
        }
      ],
      "name": "populateWhitelisted",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "whitelisted",
          "type": "address[]"
        },
        {
          "name": "tokenAmount",
          "type": "uint256[]"
        }
      ],
      "name": "updateWhitelisted",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "newAdministrator",
          "type": "address"
        }
      ],
      "name": "changeFounder",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];


var napoleonXTokenAddress = "0x28b5e12cce51f15594b0b91d5b5adaa70f684a02";
web3.personal.unlockAccount(account, unlockingPassword,"0x3e88");

var napoleonXTokenContract = web3.eth.contract(napoleonxTokenAbi);
var napoleonXToken = napoleonXTokenContract.at(napoleonXTokenAddress);

console.log(napoleonXToken.name());
//###################################################################


// Synchronous read
var data = fs.readFileSync('./data/presales_token_clean_1.csv').toString().split('\r\n');


// Looping and batch sending
var whitelisted = [];
var amount = []
var batchSize = 50;
var counter = 0;
var napoleonXWhitelistPopulateDataEstimate;

for (var i = 0; i < data.length; i++) {
  var fields = data[i].split(',');
	var myAmount = parseInt(fields[1]);
	var myAddress = fields[0];
	whitelisted.push(myAddress);
  amount.push(myAmount);
	counter = counter + 1;
	if (counter  == batchSize){
		console.log("Handling@Whitelisted@"+whitelisted.length);
		console.log("Sending populating batch");
		console.log("Batch gas estimation");
		//var napoleonXWhitelistPopulateData = napoleonXToken.populateWhitelisted.getData(whitelisted,amount);
		//var napoleonXWhitelistPopulateDataEstimate = web3.eth.estimateGas({from : account, to : napoleonXTokenAddress, data: napoleonXWhitelistPopulateData});
		//var napoleonXWhitelistPopulateDataEstimate = Math.min(web3.eth.getBlock("latest").gasLimit,napoleonXWhitelistPopulateDataEstimate+10000);

    var napoleonXWhitelistPopulateDataEstimate = web3.eth.getBlock("latest").gasLimit;

		console.log(napoleonXWhitelistPopulateDataEstimate);

		var populateWhiteList_transaction = napoleonXWhitelist.populateWhitelisted.sendTransaction(whitelisted, amount, {
				from: account,
				gas: napoleonXWhitelistPopulateDataEstimate,
				gasPrice: 60000000000

		});
		console.log("@bcTransaction@"+populateWhiteList_transaction);
		var waitingPromise = web3.eth.getTransactionReceiptMined(populateWhiteList_transaction);


		tokenAmount = [];
		whitelisted = [];
		counter = 0;
	}
}
