var web3 = require('web3');
var web3Connection = function () {
    if(typeof web3 !== 'undefined'){
        web3 = new Web3(web3.currentProvider);
    }
    else {
        web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
        console.log("Provider :",web3.currentProvider);
    }


};

module.exports = {web3Connection};