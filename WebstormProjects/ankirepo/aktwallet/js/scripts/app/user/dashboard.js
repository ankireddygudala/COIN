// function to authenticate user
var doDisplayEtherTransactions = function () {
    var addr = localStorage.getItem('address');
    var rowCount= 1;
    $('.my-table tbody').remove();
    console.log("addr: ", addr);
    var address = addr

    var uri = `http://api-rinkeby.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999`

    axios.get(uri).then(function (response) {
        var result = response.data.result;

        for (var i = result.length - 1; i >= 0; i--) {
            var d = new Date(parseInt(result[i].timeStamp));
            // console.log(d.toLocaleString());
            $('.my-table').append(`<tr>
              
                <td>${result[i].hash}</td>
                <td>${result[i].to}</td>
                <td>${result[i].value}</td>
                <td>${result[i].gasUsed}</td>
                <td>${d.toLocaleString()}</td>
                <td>${result[i].blockNumber}</td>
                <td>${result[i].txreceipt_status}</td>
                </tr>`);

        }


    }).catch(function (reason) {
        console.log(reason);
    });
};

var refreshBalance = function () {
    var token = localStorage.getItem('token');
    var atoken = token
    var link = `http://localhost:3000/api/user/getUser?token=${atoken}`;
    axios.get(`http://localhost:3000/api/user/getUser?token=${atoken}`,{})
        .then(function (response) {
        if (response.data.status == false) {
            window.alert("Something went wrong, please try again!");
            return
        }
        // window.alert(JSON.stringify(response.data, undefined,2));
        var userId = response.data.user[0].id;
        var userName = response.data.user[0].name;
        var userMail = response.data.user[0].email;

        //get ethereum address for the user id
        axios.post('http://localhost:3000/api/user/getEtherAddress', {
            userId: userId
        }).then(function (value) {
            if (value.data.status == false) {
                window.alert("Something went wrong, please try again!");
                return
            }
            // console.log(JSON.stringify(value.data,undefined,2));


            var ether_address = value.data.user[0].address;
            console.log("ether address:",ether_address);
            //store ether address in local storage
            localStorage.setItem('address', ether_address);
            localStorage.setItem('userName', userName);
            localStorage.setItem('userMail', userMail);


           //update username and email
            document.getElementById("set-username").innerText = userName;
            document.getElementById("set-usermail").innerText = userMail;

            //request to get balances of user
            axios.post('http://localhost:3000/api/eth/getBalance', {
                ether_address: ether_address

            }).then(function (value2) {

                console.log("Token Balance: ", value2.data.balance);

                document.getElementById("AKT-token-balance").innerHTML = (value2.data.balance / 1000000).toFixed(6);
            })
                .catch(function (reason) {
                    console.log(reason)
                })
            //getEtherBalance
            axios.post('http://localhost:3000/api/eth/getEtherBalance', {
                ether_address: ether_address
            }).then(function (value3) {
                console.log("Ether Balance: ", value3.data.balance);

                document.getElementById("eth-balance").innerHTML = value3.data.balance;
                doDisplayEtherTransactions();

            })
                .catch(function (reason) {
                    console.log(reason)
                })

        }).catch(function (reason) {
            console.log(reason)
        })


    })
        .catch(function (reason) {
            console.log(reason)
        })

};

// function to transfer tokens
// function to transfer ether


//== Class initialization on page load
jQuery(document).ready(function () {
    //
    // console.log(localStorage.getItem('token'));
    //auto refresh when page loaded
    refreshBalance();

    //request api to authenticate user with token

});

//refresshBalance Button
$(".refresh-balance").click(function () {
    refreshBalance();
});

// handle token transfer function

$(".logout-button").click(function () {

    localStorage.setItem('token', "");
    localStorage.setItem('address', "");
});

function verifyUser(){
    if(localStorage.getItem('token')== null || localStorage.getItem('token') == ""){
         window.location.assign("login.html");
    }
}
