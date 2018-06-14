const blocktrail = require('blocktrail-sdk');

client = blocktrail.BlocktrailSDK({apiKey: "f518fdc909d92839254e4e028ee2562565818028", apiSecret: "484f556f88f3f36025c2ac27824f576656051dab", network: "tBTC", testnet: true});


client.address('2MvxV1Uzhe3EdXjpE72oahQwZynpxCHEjgw',
    function(err, address) { console.log("address:",address.balance/100000000); });
client.blockLatest(
    function(err, block) { console.log(block.hash); });


// creating new wallet
client.createNewWallet("mywallet1", "mypass",
    function(err, wallet, backupInfo) {
        if(err){ return console.log("Error:",err);}
        console.log("Wallet", wallet);
        console.log("Backup wallet:", backupInfo);
    });

// client.initWallet("ankireddy", "amrutha$ajay2",
//     function(err, wallet) {console.log("===============>>>>>>",wallet)
//         wallet.getBalance(
//             function(err, confirmedBalance, unconfirmedBalance) {
//                 console.log('Balance: ', blocktrail.toBTC(confirmedBalance));
//                 console.log('Unconfirmed Balance: ', blocktrail.toBTC(unconfirmedBalance));
//             }
//         );
// });