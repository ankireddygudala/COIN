const express = require('express');
const bodyParser = require('body-parser');
const Web3 = require('web3');
const axios = require('axios');

var router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var web3 = new Web3();

const  pool  = require('./../../db/connection');

const config = require('./../../db/config');



web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));



console.log('Web3 provider: ',web3.currentProvider);
console.log(web3.isConected);

var constractAddress = "0x1372aC5F1965190f3D2f87362CaE2094d6efc142";
var contractAbi= [
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
        "constant": false,
        "inputs": [
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "burn",
        "outputs": [],
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
                "name": "_subtractedValue",
                "type": "uint256"
            }
        ],
        "name": "decreaseApproval",
        "outputs": [
            {
                "name": "success",
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
                "name": "success",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "previousOwner",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "OwnershipTransferred",
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
                "name": "burner",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Burn",
        "type": "event"
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
        "constant": false,
        "inputs": [
            {
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "transferOwnership",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
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
                "name": "remaining",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
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
        "name": "decimals",
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
        "name": "initialSupply",
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
        "constant": true,
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "name": "",
                "type": "address"
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
    }
];
// var contractAbi = [ { "constant": true, "inputs": [], "name": "mintingFinished", "outputs": [ { "name": "", "type": "bool", "value": false } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "name", "outputs": [ { "name": "", "type": "string", "value": "AKTCOIN" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_spender", "type": "address" }, { "name": "_value", "type": "uint256" } ], "name": "approve", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [ { "name": "", "type": "uint256", "value": "5e+28" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_from", "type": "address" }, { "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" } ], "name": "transferFrom", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "decimals", "outputs": [ { "name": "", "type": "uint256", "value": "18" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "initialSupply", "outputs": [ { "name": "", "type": "uint256", "value": "5e+28" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_to", "type": "address" }, { "name": "_amount", "type": "uint256" } ], "name": "mint", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "_value", "type": "uint256" } ], "name": "burn", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "_spender", "type": "address" }, { "name": "_subtractedValue", "type": "uint256" } ], "name": "decreaseApproval", "outputs": [ { "name": "success", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "_owner", "type": "address" } ], "name": "balanceOf", "outputs": [ { "name": "balance", "type": "uint256", "value": "0" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "finishMinting", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "owner", "outputs": [ { "name": "", "type": "address", "value": "0x37fe7501ca158af79af926d129bc8f331c8d0086" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "symbol", "outputs": [ { "name": "", "type": "string", "value": "AKTC" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" } ], "name": "transfer", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "_spender", "type": "address" }, { "name": "_addedValue", "type": "uint256" } ], "name": "increaseApproval", "outputs": [ { "name": "success", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "_owner", "type": "address" }, { "name": "_spender", "type": "address" } ], "name": "allowance", "outputs": [ { "name": "remaining", "type": "uint256", "value": "0" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "newOwner", "type": "address" } ], "name": "transferOwnership", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "to", "type": "address" }, { "indexed": false, "name": "amount", "type": "uint256" } ], "name": "Mint", "type": "event" }, { "anonymous": false, "inputs": [], "name": "MintFinished", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "burner", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" } ], "name": "Burn", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "owner", "type": "address" }, { "indexed": true, "name": "spender", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" } ], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "from", "type": "address" }, { "indexed": true, "name": "to", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" } ], "name": "Transfer", "type": "event" } ];

var MyContract = web3.eth.contract(contractAbi);

// instantiate by address
var contractInstance = MyContract.at(constractAddress);

router.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', "*");

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

//rest api to send response when home page requested
router.get('/', function (request, response) {
    response.status(200).json({
        "status": true,
        "message": 'Conneted!'
    });
});
//REST Api to create new wallet
router.post('/createNewAccount', function(request, response) {
    var psd = request.body.password;

    var account =  web3.personal.newAccount(psd);
    response.status(200).json({
        "status": true,
        "message": "new account created successfully",
        "address": account
    });
});

// REST Api to get the token balance of account
router.post('/getBalance', function (request, response) {
    var accountAddress = request.body.ether_address;
    // console.log("address",request.body.ether_address);

    // var balance = contractInstance.balanceOf(accountAddress);
    // return response.json({
    //     "status": true,
    //     "mesaage":"ok",
    //     "balance": balance.toString()
    //
    // });
    contractInstance.balanceOf(accountAddress, function(err, result) {
        if(err) {
            response.status(501).json({
                "status":false,
                "message":"an internal error occured!",
                "error": err
            })
        } else {
            response.status(200).json({
                "status": true,
                "mesaage":"ok",
                "balance": result.toString()

            });
        }
    });
});
// REST Api to get the allowence balances of spender
router.post('/getAllowanceBalance', function(request, response) {
    var from  = request.body.from;
    var spender = request.body.spender;

    web3.personal.unlockAccount(from, request.body.password);
    contractInstance.allowance(from, spender, function(err, res) {
        if(err) {
            response.status(501).json({
                "status": false,
                "meassage":err
            })
        }
        response.json({
            "status":true,
            "txn": res
        });
    });
});

// REST Api call to transfer token
router.post('/transferTo', function (request, response) {

    const from_account = request.body.from;
    const to_account = request.body.to;
    const value = request.body.value;

    web3.personal.unlockAccount(from_account,request.body.password);

    contractInstance.transfer(to_account,value, {from: from_account, gas:95000}, function(err, res){
        if(err){
            return response.json({
                status: false,
                error: err
            })
        }
        response.json({
            "status":true,
            "txn": res
        });
    });
});

// REST Api call to transfer token from another address
router.post('/transferFrom', function (request, response) {

    const from_account = request.body.from;
    const to_account = request.body.to;
    const value = request.body.value;
    const owner_account = request.body.account;

    web3.personal.unlockAccount(from_account,request.body.password);

    contractInstance.transferFrom(from_account, to_account,value, {from: owner_account, gas:95000}, function(err, res){
        if(err) {
            response.status(501).json({
                "status": false,
                "meassage":err
            })
        }
        response.json({
            "status":true,
            "txn": res
        });
    });
});


// REST Api to approve allowence to spender
router.post('/approve', function (request, response) {
    const from_account = request.body.from;
    const spender = request.body.spender;
    const value = request.body.value;

    web3.personal.unlockAccount(from_account,request.body.password);
    contractInstance.approve(spender, value, {from : from_account, gas: 95000}, function(err, res){
        if(err) {
            response.status(501).json({
                "status": false,
                "meassage":err
            })
        }
        response.json({
            "status":true,
            "txn": res
        });
    });
});
// Rest API for increaseApproval
router.post('/increaseApproval', (request, response)=>{
    const from_account = request.body.from;
const spender = request.body.spender;
const value = request.body.value;

web3.personal.unlockAccount(from_account,request.body.password);

contractInstance.increaseApproval(spender, value,{from : from_account, gas: 95000}, function(err, res){
    if(err) {
        response.status(501).json({
            "status": false,
            "meassage":err
        })
    }
    response.json({
        "status":true,
        "txn": res
    });
});
});
// REST Api to decrease approval
router.post('/decreaseApproval', (request, response)=>{
    const from_account = request.body.from;
const spender = request.body.spender;
const value = request.body.value;

web3.personal.unlockAccount(from_account,request.body.password);

contractInstance.decreaseApproval(spender, value,{from : from_account, gas: 95000}, function(err, res){
    if(err) {
        response.status(501).json({
            "status": false,
            "meassage":err
        })
    }
    response.json({
        "status":true,
        "txn": res
    });
});
});

//REST Api to burn tokens
router.post('/admin/burnTokens', function (request, response) {
    var admin_address = request.body.admin_address;
    var value = request.body.value;
    web3.personal.unlockAccount(admin_address,request.body.password);

    contractInstance.burn(value,{from:admin_address, gas:95000}, function (err, res){
        if(err) {
            response.status(501).json({
                "status": false,
                "meassage": err
            })
        }
        response.json({
            "status":true,
            "txn": res
        });
    });
});
//REST API to mint new tokens
router.post('/admin/mintToken', function (request, response) {
    var admin_address = request.body.admin_address;
    var value = request.body.value;
    web3.personal.unlockAccount(admin_address,request.body.password);


    contractInstance.mint(admin_address, value,{from:admin_address, gas:95000}, function (err, res){
        if(err) {
            response.status(501).json({
                "status": false,
                "meassage":err
            })
        }
        response.json({
            "status":true,
            "txn": res
        });
    });
});
// REST Api to close minting new tokns
router.post('/admin/finishMint', function(request, response) {
    var admin_address = request.body.admin_address;
    web3.personal.unlockAccount(admin_address,request.body.password);

    contractInstance.finishMinting({from:admin_address, gas:95000}, function (err, res){
        if(err) {
           return response.status(501).json({
                "status": false,
                "meassage":err
            })
        }
        response.json({
            "status":true,
            "txn": res
        });
    });
});


// REST Api to get the ether balance
router.post('/getEtherBalance', function(request, response) {
    var account_address = request.body.ether_address;
// console.log(account_address);
    web3.eth.getBalance(account_address, function (err, res) {
        if(err) {
           return response.status(501).json({
                "status": false,
                "meassage":err
            })
        }
        // var balance = web3.toBigNumber(res);
        response.status(200).json({
            "status": true,
            "mesaage":"ok",
            "balance": web3.fromWei(res, 'ether')

        });
      });
    // var balance = web3.fromWei(web3.eth.getBalance(web3.eth.accounts[0]), 'ether');
    // return response.json({
    //     "status":true,
    //     "message":"ok",
    //     "balance":balance
    // })


});

// REST Api to get the transaction count
router.post('/getTransactionCount', function(request, response) {
    var ether_address = request.body.ether_address;
    web3.personal.unlockAccount(ether_address,request.body.password);

    web3.eth.getTransactionCount(ether_address, function (err, res) {
        if(err) {
            response.status(501).json({
                "status": false,
                "meassage":err
            })
        }
        response.json({
            "status":true,
            "txnCount": res
        });
    });
});
//REST Api to get the transaction stratus
router.post('/getTransactionStatus', function (request, response) {
    var txn_hash = request.body.txn_hash;
    web3.eth.getTransaction(txn_hash, function (err, res) {
        if(err) {
            response.status(501).json({
                "status": false,
                "meassage":err
            })
        }
        response.json({
            "status":true,
            "result": res
        });
    })
});

//REST Api to transfer ether
router.post('/transferEther', function(request, response) {
    var to = request.body.to;
    var from = request.body.from;
    var value = request.body.value;
    var password = request.body.password;
    web3.personal.unlockAccount(from,password,function(err,data){
        if(err!=null){
            if(err) {
                return response.status(501).json({
                    "status": false,
                    "meassage":err
                })
            }
        }
        web3.eth.sendTransaction({
            from:from,
            to:to,
            value:value * 1000000000000000000,
        },function(err,resp){
            if(err) {
                return response.status(501).json({
                    "status": false,
                    "meassage":err
                })
            }
            response.json({
                "status":true,
                "txn": resp
            });
        });
    });
});

// REST Api to buy tokens
// REST Api to buy tokens
router.post('/buyTokens', function(request, response) {
    var beneficiary = "0x3B7cd11b52113eb5625C114339b0b63F7f48c690";
    var from = request.body.from;
    var value = request.body.value;
    var password = request.body.password;
    var beneficiary_password = "Amrutha$ajay2";
    // transfer tokens to buyer
    // web3.personal.unlockAccount(beneficiary,request.body.password);
console.log(from,value,password);
    web3.personal.unlockAccount(from, password,function(err,data){
        if(err!=null){
            return response.status(501).json({
                "status": false,
                "meassage":"first"
            })
        }
        web3.eth.sendTransaction({
            from:from,
            to:beneficiary,
            value: (value/1000000) * 0.001 * 1000000000000000000
        },function(err,resp){
            if(err!=null){
                return response.status(501).json({
                    "status": false,
                    "meassage":"second"
                })
            }

            console.log("sending transaction...");
            // wait for token transfer to verify ether transfer trasaction success
            setTimeout( function(){
                var uri = `https://api-rinkeby.etherscan.io/api?module=transaction&action=gettxreceiptstatus&txhash=${resp}`;
                axios.get(uri)
                    .then(function (response1) {
                        if(response1.data.result.status == '0'){
                            return response.status(501).json({
                                "status": false,
                                "meassage":"ether trasfer transaction failed"
                            })
                        }
                        else{
                            web3.personal.unlockAccount(beneficiary, beneficiary_password);

                            contractInstance.transfer(from, value, {from: beneficiary, gas:95000}, function(err, res) {
                                if (err) {
                                    return response.status(501).json({
                                        "status": false,
                                        "meassage": err
                                    })
                                }else{
                                    response.json({
                                        "status": true,
                                        "token-txn":res,
                                        "ether-txn":resp
                                    });
                                }

                            })

                        }


                    })
                    .catch(function (error) {
                        response.status(501).json({
                            "status": false,
                            "meassage":error
                        })
                    });

            }, 3000);

        });
    });
});
// to get transaction history
// use the fallowing url to get response
//http://api-rinkeby.etherscan.io/api?module=account&action=txlist&address=0x37fE7501ca158af79AF926d129BC8f331C8d0086&startblock=0&endblock=99999999&sort=asc

module.exports = router;
