var Wallet = require('ethers').Wallet;
var ethers = require('ethers');

var wallet = Wallet.createRandom();
console.log("Address: " + wallet.address);

// var mnemonic = "radar blur cabbage chef fix engine embark joy scheme fiction master release";
// //rack adjust morning kangaroo dolphin silent balcony stem bounce focus lesson reject
// //0xb96e9ccb774cc33213cbcb2c69d3cdae17b0fe4888a1ccd343cbd1a17fd98b18 privare key
// // var wallet1 = Wallet.fromMnemonic(mnemonic);
// //
// // wallet1.address = "0x281055afc982d96fab65b3a49cac8b878184cb16";
// // console.log("Address: " + JSON.stringify(wallet1, undefined,3));

// var privateKey = '0x0123456789012345678901234567890123456789012345678901234567890123';
// var wallet1 = new Wallet(privateKey);
// wallet1.provider = ethers.providers.getDefaultProvider();

// var balancePromise = wallet1.getBalance();

// balancePromise.then(function(balance) {
//     console.log(balance);
// });

// var transactionCountPromise = wallet.getTransactionCount();

// transactionCountPromise.then(function(transactionCount) {
//     console.log(transactionCount);
// });