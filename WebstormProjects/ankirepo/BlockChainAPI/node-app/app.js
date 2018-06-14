// const blockChain = require('blockchain.info');
//API  Code: 4f619c65-8193-4e36-87cb-40b624caafbf
//XPUB = xpub6BseHVJdc8n2wbJLkgFMpJkpatm6SHHBNoVP1mTNjd4dWzcZWp637ZeJ5pWXhPma3X4QQbEm78d94yrp3MxonJ5Z82ft5hp7Eroxw7xH3Xg







// all config options are optional
const Client = require('bitcoin-core');
const client = new Client({
    network: 'testnet',
    host: 'localhost',
    port: 19001,
    username: 'admin1',
    password:'123',
    timeout: 30000,
    headers: true

});

// client.getBlockchainInfo(function(error, help) { console.log(help)});


//getting account address
// client.getAccount('2Mx8xEZBfBwBV8AuGsDLp12Rvh9BsNTuTKV',function (err,data) {
//     console.log(data);
// });

//getting transaction info
// client.getTransaction('f4b15637738b7b1e6f833e10e67cb83d337aebcafd8c983014e8635b33f5085b', function (err, res) {
//     console.log("Transaction :", res);
// });
//
// client.getDifficulty(function(err, difficulty) {
//     if (err) {
//         return console.error(err);
//     }
//
//     console.log('Difficulty: ' + JSON.stringify(difficulty, undefined,2));
// });

client.getBalance('*', 1, function(err, balance, resHeaders) {
    if (err) return console.log(err);
    console.log('Balance:', balance);
});

client.command('getbalance', 'mw6FLHbV2XPgztUfRCKr4kXiJ9GkaJwUzG', 1, function(err, balance){
    if (err) return console.log(err);
    console.log('Balance:', balance);
});

client.command('getblockcount', function (err, res) {
    if (err) return console.log(err);
    console.log('LastBlock :', res);
});

client.command('gettransaction' ,'e240ad7aad147a680efe822805e610529780d233a3f3285167cce5ffafe12157', function(err, res){
    if(err){ return console.log(err);}
    console.log("Transaction", JSON.stringify(res, undefined,2));
})

//password
client.command('getaccount','mw6FLHbV2XPgztUfRCKr4kXiJ9GkaJwUzG', function (err, res) {
    console.log("=====================>>>>",res);
})


