var request = require('request');
var options = {
    body: {
        "fullname":"raghu",
        "password":"123456",
        "email":"sample@gmail.com",
        "userType":2
},
    json: true

}
request.post('http://192.168.1.7:3002/login',options, function (err, res) {
    if(err){
        console.log(err);
    }
    else {
        console.log(res.body);
    }
})
