var Web3 = require('web3');
var util = require('ethereumjs-util');
var tx = require('ethereumjs-tx');
var lightwallet = require('eth-lightwallet');
var txutils = lightwallet.txutils;



var web3 = new Web3(
    new Web3.providers.HttpProvider('https://ropsten.infura.io/MNwtMqMYTxSuFJNNHtY3')
    //new Web3.providers.HttpProvider('http://localhost:8545')
);

var address = '0x6551f97f7d133083b11c0350c5fa83eefee8000d'
var key = '**'

var address2 = '0x4193e9042c92f321cdf43e83f151ae686fd9a75d';


var amount = web3.toWei(1, "ether");
var balance = web3.eth.getBalance(address);

var value = web3.fromWei(balance, 'ether');

console.log(value);

function sendRaw(rawTx) {
    var privateKey = new Buffer(key, 'hex');
    var transaction = new tx(rawTx);
    transaction.sign(privateKey);
    var serializedTx = transaction.serialize().toString('hex');
    web3.eth.sendRawTransaction(
        '0x' + serializedTx, function(err, result) {
            if(err) {
                console.log('error');
                console.log(err);
            } else {
                console.log('success');
                console.log(result);
            }
        });
}


var rawTx = {
    nonce: web3.toHex(web3.eth.getTransactionCount(address)),
    gasLimit: web3.toHex(21000),
    chainId: 3,
    gasPrice: "0x9184e72a000", // 10000000000000
    to: address2,
    from:address,
    value: web3.toHex(web3.toBigNumber(amount))
}

sendRaw(rawTx);