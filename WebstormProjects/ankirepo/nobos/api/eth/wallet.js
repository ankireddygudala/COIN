const web3 = require('./web3'); //get web3 connection

//function to create new ether wallet using web3
exports.createEtherWallet = function (password) {

    //create new wallet
    return web3.personal.newAccount(password);
};
