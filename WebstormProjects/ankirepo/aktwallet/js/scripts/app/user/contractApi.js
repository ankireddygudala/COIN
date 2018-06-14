// function to authenticate user
//purchase tokens
var doPurchaseToken = function (value, password, callback) {
    var from = localStorage.getItem('address');

    axios.post('http://localhost:3000/api/eth/buyTokens',{
        from:from,
        value:value * 1000000,
        password:password

    }).then(function (value2) {
            if(value2.data.status === true){
                document.getElementById("purchase-message").style.color = "blue";
                callback("Purchase success, wait for few minutes to update balance");
            }
            else{
                document.getElementById("purchase-message").style.color = "red";
                callback("Purchase failed, try again!")

            }
            console.log(JSON.stringify(value2, undefined,2));
        }).catch(function (reason) {
        document.getElementById("purchase-message").style.color = "red";
            callback(reason);
    })
};


// function to transfer tokens
var doTokenTransfer = function (toAddress, tokens, password, callback) {
    // making request

    var from = localStorage.getItem('address');

    axios.post('http://localhost:3000/api/eth/transferTo', {
            from:from,
            to:toAddress,
            value:tokens * 1000000,
            password:password
        }
    ).then(function (value) {
        // window.alert(JSON.stringify(value.data, undefined,2));
        if(value.data.status === true){
            document.getElementById("token-message").style.color = "blue";
            document.getElementById("token-form").reset();
            callback(`Token Txn hash: ${value.data.txn}`);
        }else {
            document.getElementById("token-message").style.color = "red";
            document.getElementById("token-form").reset();
            callback("Token transfer failed");
        }


    }).catch(function (reason) {
        document.getElementById("token-message").style.color = "red";
        callback(reason);
    })

};

// function to transfer ether
var doEtherTransfer = function (toAddress, ether, password, callback) {
    var from = localStorage.getItem('address');

    axios.post('http://localhost:3000/api/eth/transferEther', {
            from:from,
            to:toAddress,
            value:ether,
            password:password
        }
    ).then(function (value) {
        window.alert("Ether trasfered successfully!");
        if(value.data.status === true){
            document.getElementById("ether-message").style.color = "blue";
            document.getElementById("ether-form").reset();
            callback(`Ether successfully transfered, hash:${value.data.txn}`);

        }
        else {
            document.getElementById("ether-message").style.color = "red";

            document.getElementById("ether-form").reset();
            callback("Transaction failed!");

        }

    }).catch(function (reason) {
        document.getElementById("ether-message").style.color = "red";
        document.getElementById("ether-form").reset();
        callback(reason);
    })
};


//== Class initialization on page load
jQuery(document).ready(function() {
    //
    // console.log(localStorage.getItem('token'));
    //auto refresh when page loaded
    //request api to authenticate user with token

    //update username and email
    document.getElementById("set-username").innerText = localStorage.getItem('userName');
    document.getElementById("set-usermail").innerText = localStorage.getItem('userMail');

});



// handle token transfer function
function doTransferToken() {
    var tokenValue = document.getElementById("token-amount").value;
    var toAddress = document.getElementById("token-address").value;
    var password = document.getElementById("token-password").value;

    //validate
    if(toAddress.length<10 || password.length < 6){
        window.alert("invalid details");
    }
    else {
        doTokenTransfer(toAddress, tokenValue, password, function (message) {
           window.alert(message);
            document.getElementById("token-message").innerText = message;

        });
    }

}

//handling ether transfers
function doTransferEther() {
   var toAddress = document.getElementById("ether-address").value;
   var ether = document.getElementById("ether-amount").value;
   var password = document.getElementById("ether-password").value;

    //validate
    if(toAddress.length< 15 ||  password.length < 6){
        window.alert("invalid details");
    }
    else {
        doEtherTransfer(toAddress, ether, password, function (message) {
            window.alert(message);
            document.getElementById("ether-message").innerText = message;

        });
    }
}




//purchase tokens
function doPurchaseToken() {
    var value = document.getElementById("token-count").value;
    var password = document.getElementById("account-password").value;

    if(password.length <6 ){
        window.alert("Invalid details!");
    }
    else{
        doPurchaseToken(value, password, function (message) {
            window.alert(message);
            document.getElementById("purchase-message").innerText = message;
        });
    }
}

function verifyUser(){
    if(localStorage.getItem('token')== null){
        window.location.assign("login.html");
    }
}
// function to update ether amount
function updateEther() {
    var value = document.getElementById("token-count").value;

    document.getElementById("ether-value").value = value*0.001;

}
setTimeout(function () {
    // document.getElementById("purchase-message").innerHTML = "";
    document.getElementById("token-message").innerText = "";
    document.getElementById("ether-message").innerText = "";

},5000)


//logout service
$(".logout-button").click(function () {
    localStorage.setItem('token', "");
    localStorage.setItem('address', "");
    localStorage.setItem('userName', "");
    localStorage.setItem('userMail', "");
});
