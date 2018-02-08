const fs = require("fs");
//const solc = require('solc');
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

const account = web3.eth.accounts[0];
const account_sidekick = web3.eth.accounts[1];
const recipient = web3.eth.accounts[2];
web3.personal.unlockAccount(account,unlockingPassword, 1000);
console.log(account);

var crowdSaleContractAddress = "0x41c8ca1c5ee16a65bfe9434df53b2c6c7d1dda7e";
var napoleonXMultiSigWalletAddress  = "0xf1565df2b02ac6d756a1a594b180d34ee3438be8";

var napoleonxcrowdsaleAbi = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"MIN_TOKEN_AMOUNT_INVESTMENT","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"greenlistTotalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"investedAmountOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"bountyAllocated","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"ETHER_MIN_CAP","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"presaleEndTime","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"endTime","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_startTime","type":"uint256"}],"name":"setStartTime","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"weiRaised","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"presaleEtherRaised","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"MAX_GREENLIST_CONTRIBUTION_DURATION","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"halt","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"min_cap","type":"uint256"},{"name":"max_cap","type":"uint256"}],"name":"setTestingCap","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"bountyLockup","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"startTime","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"getBackEtherTest","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"founderLockup","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"newFounder","type":"address"}],"name":"changeFounder","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"ETHER_MAX_CAP","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"FOUNDER_ALLOCATION","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"founderAllocated","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"bountyPercentage","type":"uint256"}],"name":"allocateBountyTokens","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"committer","type":"address"},{"name":"value","type":"uint256"}],"name":"registerCommitment","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"founderAllocationInPercent","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"halted","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"allocateFounderTokens","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"committers","type":"address[]"},{"name":"values","type":"uint256[]"}],"name":"populateExistingGreenList","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"transferLockup","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"GREENLIST_DISCOUNT","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"presaleTokenSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"unhalt","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_endTime","type":"uint256"}],"name":"setEndTime","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_presaleEndTime","type":"uint256"}],"name":"setPresaleEndTime","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"buyTokens","outputs":[],"payable":true,"type":"function"},{"constant":true,"inputs":[],"name":"discountInPercent","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"ONE_NPX_TOKEN_PRICE","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getICOStage","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"MAX_CONTRIBUTION_DURATION","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_committer","type":"address"}],"name":"commitmentOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"safeWithdrawal","outputs":[],"payable":false,"type":"function"},{"inputs":[{"name":"_napoleonXMultiSigWallet","type":"address"},{"name":"setStartTime","type":"uint256"}],"payable":false,"type":"constructor"},{"payable":true,"type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"sender","type":"address"},{"indexed":false,"name":"eth","type":"uint256"},{"indexed":false,"name":"fbt","type":"uint256"}],"name":"Buy","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"sender","type":"address"},{"indexed":false,"name":"eth","type":"uint256"},{"indexed":false,"name":"fbt","type":"uint256"}],"name":"PresaleBuy","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"sender","type":"address"},{"indexed":false,"name":"to","type":"address"},{"indexed":false,"name":"eth","type":"uint256"}],"name":"Withdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"sender","type":"address"}],"name":"AllocateFounderTokens","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"sender","type":"address"}],"name":"AllocateBountyTokens","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"investor","type":"address"},{"indexed":false,"name":"weiAmount","type":"uint256"}],"name":"Refund","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_spender","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Approval","type":"event"}];

var napoleonxcrowdsaleContract = web3.eth.contract(napoleonxcrowdsaleAbi);
var napoleonxcrowdsale = napoleonxcrowdsaleContract.at(crowdSaleContractAddress);


console.log("Setting proper min/max capitalization for test ICO");
console.log(napoleonxcrowdsale.ETHER_MIN_CAP());
console.log(napoleonxcrowdsale.ETHER_MAX_CAP());
console.log(napoleonxcrowdsale.startTime());
console.log(napoleonxcrowdsale.endTime());

var capitalizationLimits_transaction = napoleonxcrowdsale.setTestingCap.sendTransaction(
web3.toWei(5, "ether"),
web3.toWei(7, "ether"),
 {
        from: account,
        gas: 1000000
 });
var MyCapitalizationReceipt = web3.eth.getTransactionReceiptMined(capitalizationLimits_transaction);
console.log(napoleonxcrowdsale.ETHER_MIN_CAP());
console.log(napoleonxcrowdsale.ETHER_MAX_CAP());

console.log("Setting proper time frame for unit testing");
// changing the contract presale beginning, end and crowdsale end time
var startDate = new Date();
var startingTime = startDate.getTime()/1000;

var endPresaledDate = new Date(new Date().getTime());
endPresaledDate.setHours(endPresaledDate.getHours()+1);
// blockchain timestamp is in seconds, not milliseconds
var endingPresaleTime = endPresaledDate.getTime()/1000;

var endDate = new Date(new Date().getTime());
endDate.setHours(endDate.getHours()+2);
// blockchain timestamp is in seconds, not milliseconds
var endingTime = endDate.getTime()/1000;

// in this scenario all users vote for the change
console.log("Setting proper time frame for unit testing");
console.log(napoleonxcrowdsale.startTime());
var startingTime_transaction = napoleonxcrowdsale.setStartTime.sendTransaction(
startingTime,
 {
        from: account,
        gas: 1000000
 });
var MyStartingTimeReceipt = web3.eth.getTransactionReceiptMined(startingTime_transaction);

var endingTime_transaction = napoleonxcrowdsale.setEndTime.sendTransaction(
endingTime,
 {
        from: account,
        gas: 1000000
 });
var MyEndingTimeReceipt = web3.eth.getTransactionReceiptMined(endingTime_transaction);

var presaleEndingTime_transaction = napoleonxcrowdsale.setPresaleEndTime.sendTransaction(
endingPresaleTime,
 {
        from: account,
        gas: 1000000
 });
var MyPresaleEndingTimeReceipt = web3.eth.getTransactionReceiptMined(presaleEndingTime_transaction);


console.log("We have one hour to emulate the presale")


console.log(web3.eth.getBlock(web3.eth.blockNumber).timestamp*1000);
console.log(new Date());
console.log(new Date(web3.eth.getBlock(web3.eth.blockNumber).timestamp*1000));
console.log(new Date().getTime());


console.log(new Date(web3.eth.getBlock(web3.eth.blockNumber).timestamp));

console.log(napoleonxcrowdsale.getICOStage());
console.log(napoleonxcrowdsale.startTime());
console.log(napoleonxcrowdsale.endTime());
console.log(napoleonxcrowdsale.presaleEndTime());

var greenlist_committers = [
web3.eth.accounts[1],
web3.eth.accounts[2],
web3.eth.accounts[3]
];

var greenlist_committed_amounts = [
web3.toWei(2.5, "ether"),
web3.toWei(1, "ether"),
web3.toWei(0.5,"ether")
];

var fillingGreenList_transaction = napoleonxcrowdsale.populateExistingGreenList.sendTransaction(
greenlist_committers,
greenlist_committed_amounts,
 {
        from: account,
        gas: 1000000
 });
var MyGreenlistTimeReceipt = web3.eth.getTransactionReceiptMined(fillingGreenList_transaction);


console.log(napoleonxcrowdsale.commitmentOf(web3.eth.accounts[1]));
console.log(napoleonxcrowdsale.commitmentOf(web3.eth.accounts[2]));
console.log(napoleonxcrowdsale.commitmentOf(web3.eth.accounts[3]));
console.log(napoleonxcrowdsale.commitmentOf(web3.eth.accounts[4]));


//// fake first presale entry
//// user has committed 2.5 ethers but does actually send first 1 ether
//console.log(napoleonxcrowdsale.commitmentOf(web3.eth.accounts[1]));
//console.log(napoleonxcrowdsale.investedAmountOf(web3.eth.accounts[1]));
//console.log(napoleonxcrowdsale.getICOStage());
//var actual_amount_sent = web3.toWei(1, "ether");
//console.log(napoleonxcrowdsale.fallBackDebug(actual_amount_sent,web3.eth.accounts[1]));


//// fake second presale entry
//// user has committed 1 ether but actually sends 1.8 ethers
//console.log(napoleonxcrowdsale.getICOStage());
//console.log(napoleonxcrowdsale.commitmentOf(web3.eth.accounts[2]));
//console.log(napoleonxcrowdsale.investedAmountOf(web3.eth.accounts[2]));
//var actual_amount_sent = web3.toWei(1.8,"ether");
//console.log(napoleonxcrowdsale.fallBackDebug(actual_amount_sent,web3.eth.accounts[2]));

//// fake third presale entry
//// user has committed 0.5 ether but actually sends 0.8 ethers
//console.log(napoleonxcrowdsale.getICOStage());
//console.log(napoleonxcrowdsale.commitmentOf(web3.eth.accounts[3]));
//console.log(napoleonxcrowdsale.investedAmountOf(web3.eth.accounts[3]));
//var actual_amount_sent = web3.toWei(0.8,"ether");
//console.log(napoleonxcrowdsale.fallBackDebug(actual_amount_sent,web3.eth.accounts[3]));


// estimating the fallback function gas
// using the callback
var greenlistData = napoleonxcrowdsale.populateExistingGreenList.getData(greenlist_committers,greenlist_committed_amounts);
var estimate = web3.eth.estimateGas({data: greenlistData});

var buyTokensData=napoleonxcrowdsale.buyTokens.getData();
var buyTokensDataEstimate = web3.eth.estimateGas({data: buyTokensData});

// first presale entry
// user has committed 2.5 ethers but does actually send 1 ether then 2.8 ethers
console.log(napoleonxcrowdsale.commitmentOf(web3.eth.accounts[1]));
console.log(napoleonxcrowdsale.investedAmountOf(web3.eth.accounts[1]));
console.log(napoleonxcrowdsale.getICOStage());
var actual_amount_sent = web3.toWei(1, "ether");
web3.personal.unlockAccount(web3.eth.accounts[1],unlockingPassword,1000);
var first_presale_transac = web3.eth.sendTransaction({from:web3.eth.accounts[1], to:crowdSaleContractAddress, value: actual_amount_sent,gas:buyTokensDataEstimate});
var MyFirstPresaleReceipt = web3.eth.getTransactionReceiptMined(first_presale_transac);
console.log(web3.eth.getBalance(web3.eth.accounts[1]));
console.log(napoleonxcrowdsale.investedAmountOf(web3.eth.accounts[1]));
console.log(web3.eth.getBalance(crowdSaleContractAddress));
// we should not see any discount as he promised 2.5 and sent 1
console.log(napoleonxcrowdsale.balanceOf(web3.eth.accounts[1]));

// second send
// user has committed 2.5 ethers but does actually send 1 ether then 2.8 ethers
var actual_amount_sent = web3.toWei(2.8, "ether");
web3.personal.unlockAccount(web3.eth.accounts[1],unlockingPassword,1000);
var first_presale_second_transac = web3.eth.sendTransaction({from:web3.eth.accounts[1], to:crowdSaleContractAddress, value: actual_amount_sent,gas:buyTokensDataEstimate});
var MyFirstPresaleSecondReceipt = web3.eth.getTransactionReceiptMined(first_presale_second_transac);
console.log(web3.eth.getBalance(web3.eth.accounts[1]));
console.log(napoleonxcrowdsale.investedAmountOf(web3.eth.accounts[1]));
console.log(web3.eth.getBalance(crowdSaleContractAddress));
// the user sent overall 3.8 and promised 2.5
// we should see the discount applied to 2.5*1.5*1.2 + 3.8-2.5*1.5
console.log(napoleonxcrowdsale.balanceOf(web3.eth.accounts[1]));


// second presale entry
// user has committed 1.5ethers but actually send 1.8 ethers
console.log(napoleonxcrowdsale.getICOStage());
console.log(napoleonxcrowdsale.commitmentOf(web3.eth.accounts[2]));
console.log(napoleonxcrowdsale.investedAmountOf(web3.eth.accounts[2]));

var actual_amount_sent = web3.toWei(1.8, "ether");
web3.personal.unlockAccount(web3.eth.accounts[2],unlockingPassword,1000);
var second_presale_transac = web3.eth.sendTransaction({from:web3.eth.accounts[2], to:crowdSaleContractAddress, value: actual_amount_sent, gas:buyTokensDataEstimate});
var MySecondPresaleReceipt = web3.eth.getTransactionReceiptMined(second_presale_transac);
console.log(web3.eth.getBalance(web3.eth.accounts[2]));
console.log(napoleonxcrowdsale.investedAmountOf(web3.eth.accounts[2]));
console.log(web3.eth.getBalance(crowdSaleContractAddress));
// should 1*1.5*1.2 + 1.8-1.5
console.log(napoleonxcrowdsale.balanceOf(web3.eth.accounts[2]));

// total balance of crowdsale contract which acts as an escrow contract for the crowdsale duration
// we are at 5.6 ethers : the c
console.log(web3.eth.getBalance(crowdSaleContractAddress));
console.log(napoleonxcrowdsale.ETHER_MIN_CAP());
console.log(napoleonxcrowdsale.ETHER_MAX_CAP());

// good scenario the crowd sale does reach its total : everything should be go to the multisig
// good scenario the crowd sale does reach its total : everything should be go to the multisig
// good scenario the crowd sale does reach its total : everything should be go to the multisig
// good scenario the crowd sale does reach its total : everything should be go to the multisig
// good scenario the crowd sale does reach its total : everything should be go to the multisig
// good scenario the crowd sale does reach its total : everything should be go to the multisig
// good scenario the crowd sale does reach its total : everything should be go to the multisig
web3.personal.unlockAccount(account,unlockingPassword,1000);
var artificial_endingTime_transaction = napoleonxcrowdsale.setEndTime.sendTransaction(
startingTime,
 {
        from: account,
        gas: 1000000
 });
var MyArtificialEndingTimeReceipt = web3.eth.getTransactionReceiptMined(artificial_endingTime_transaction);
var artificial_presaleEndingTime_transaction = napoleonxcrowdsale.setPresaleEndTime.sendTransaction(
startingTime,
 {
        from: account,
        gas: 1000000
 });
var MyArtificialPresaleEndingTimeReceipt = web3.eth.getTransactionReceiptMined(artificial_presaleEndingTime_transaction);

console.log(napoleonxcrowdsale.getICOStage());
console.log(napoleonxcrowdsale.startTime());
console.log(napoleonxcrowdsale.endTime());
console.log(napoleonxcrowdsale.presaleEndTime());

///  every one can withdraw its investment
var safeWithdrawalData=napoleonxcrowdsale.safeWithdrawal.getData();
var safeWithdrawalDataEstimate = web3.eth.estimateGas({data: safeWithdrawalData});

// first to withdraw is account 1 who should get back its 3.8 ethers
console.log(web3.eth.getBalance(crowdSaleContractAddress));
console.log(web3.eth.getBalance(web3.eth.accounts[1]));
console.log(napoleonxcrowdsale.investedAmountOf(web3.eth.accounts[1]));
web3.personal.unlockAccount(web3.eth.accounts[1],unlockingPassword,1000);
var safeWithdrawal_transaction = napoleonxcrowdsale.safeWithdrawal.sendTransaction(
 {
        from: web3.eth.accounts[1],
        gas: safeWithdrawalDataEstimate
 });
var MySafeWithDrawalReceipt = web3.eth.getTransactionReceiptMined(safeWithdrawal_transaction);
console.log(web3.eth.getBalance(web3.eth.accounts[1]));
console.log(napoleonxcrowdsale.investedAmountOf(web3.eth.accounts[1]));

///  every one can withdraw its investment
var safeWithdrawalData=napoleonxcrowdsale.safeWithdrawal.getData();
var safeWithdrawalDataEstimate = web3.eth.estimateGas({data: safeWithdrawalData});

// second to withdraw is account 1 who should get back its 1.8 ethers
console.log(web3.eth.getBalance(crowdSaleContractAddress));
console.log(web3.eth.getBalance(web3.eth.accounts[2]));
console.log(napoleonxcrowdsale.investedAmountOf(web3.eth.accounts[2]));
web3.personal.unlockAccount(web3.eth.accounts[2],unlockingPassword,1000);
var safeWithdrawal_transaction = napoleonxcrowdsale.safeWithdrawal.sendTransaction(
 {
        from: web3.eth.accounts[2],
        gas: safeWithdrawalDataEstimate
 });
var MySafeWithDrawalReceipt = web3.eth.getTransactionReceiptMined(safeWithdrawal_transaction);
console.log(web3.eth.getBalance(web3.eth.accounts[2]));
console.log(napoleonxcrowdsale.investedAmountOf(web3.eth.accounts[2]));

// the crowdsale token escrow contract should be empty :
console.log(web3.eth.getBalance(crowdSaleContractAddress));


// bad scenario the crowd sale does not reach its total : everything should be reimbursed
// bad scenario the crowd sale does not reach its total : everything should be reimbursed
// bad scenario the crowd sale does not reach its total : everything should be reimbursed
// bad scenario the crowd sale does not reach its total : everything should be reimbursed
// bad scenario the crowd sale does not reach its total : everything should be reimbursed
// bad scenario the crowd sale does not reach its total : everything should be reimbursed
// bad scenario the crowd sale does not reach its total : everything should be reimbursed
web3.personal.unlockAccount(account,unlockingPassword,1000);
var capitalizationLimits_transaction = napoleonxcrowdsale.setTestingCap.sendTransaction(
web3.toWei(6, "ether"),
web3.toWei(7, "ether"),
 {
        from: account,
        gas: 1000000
 });
var MyCapitalizationReceipt = web3.eth.getTransactionReceiptMined(capitalizationLimits_transaction);
console.log(napoleonxcrowdsale.ETHER_MIN_CAP());
console.log(napoleonxcrowdsale.ETHER_MAX_CAP());
console.log(napoleonxcrowdsale.weiRaised());
console.log(napoleonxcrowdsale.presaleTokenSupply());
console.log(napoleonxcrowdsale.presaleEtherRaised());

// artificially closing the auction
var artificial_endingTime_transaction = napoleonxcrowdsale.setEndTime.sendTransaction(
startingTime,
 {
        from: account,
        gas: 1000000
 });
var MyArtificialEndingTimeReceipt = web3.eth.getTransactionReceiptMined(artificial_endingTime_transaction);
var artificial_presaleEndingTime_transaction = napoleonxcrowdsale.setPresaleEndTime.sendTransaction(
startingTime,
 {
        from: account,
        gas: 1000000
 });
var MyArtificialPresaleEndingTimeReceipt = web3.eth.getTransactionReceiptMined(artificial_presaleEndingTime_transaction);

console.log(napoleonxcrowdsale.getICOStage());
console.log(napoleonxcrowdsale.startTime());
console.log(napoleonxcrowdsale.endTime());
console.log(napoleonxcrowdsale.presaleEndTime());

// observing that the ICO has failed
console.log(napoleonxcrowdsale.ETHER_MIN_CAP());
console.log(napoleonxcrowdsale.ETHER_MAX_CAP());
console.log(napoleonxcrowdsale.weiRaised());


/// reimbursing every one
var safeWithdrawalData=napoleonxcrowdsale.safeWithdrawal.getData();
var safeWithdrawalDataEstimate = web3.eth.estimateGas({data: safeWithdrawalData});

console.log(web3.eth.getBalance(crowdSaleContractAddress));
console.log(web3.eth.getBalance(web3.eth.accounts[1]));
console.log(web3.eth.getBalance(web3.eth.accounts[2]));
console.log(web3.eth.getBalance(web3.eth.accounts[3]));

web3.personal.unlockAccount(account,unlockingPassword,1000);
var safeWithdrawal_transaction = napoleonxcrowdsale.safeWithdrawal.sendTransaction(
 {
        from: account,
        gas: safeWithdrawalDataEstimate
 });
var MySafeWithDrawalReceipt = web3.eth.getTransactionReceiptMined(safeWithdrawal_transaction);


///// getting back all
web3.personal.unlockAccount(account,unlockingPassword,1000);

var getting_back_ether_transaction = napoleonxcrowdsale.getBackEtherTest.sendTransaction(
 {
        from: account,
        gas: 1000000
 });

var MyGettingBackEtherReceipt = web3.eth.getTransactionReceiptMined(getting_back_ether_transaction);
console.log(web3.eth.getBalance(crowdSaleContractAddress));
console.log(web3.eth.getBalance(account));
