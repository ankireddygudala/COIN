// var Wallet = require('ethers').Wallet;
//
//
// var generateRandomAddress = function(){
//     return Wallet.createRandom().address;
// }

var axios = require('axios');

var generateRandomAddress = function(password) {
    // request api to generate address

    axios.post('http://localhost:5500/api/geth/createNewAccount',{
        password: password
    })
        .then(function (response) {
            return response.data.address;
        })
        .catch(function (error) {
            console.log(error);
        });
}

module.exports =  { generateRandomAddress };

