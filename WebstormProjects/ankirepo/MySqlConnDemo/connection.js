var mysql = require('mysql');

var connection = mysql.createConnection({
    user:'root',
    host:'localhost',
    password:'',
    database:'affiliate'
});
connection.connect(function (err) {
    if(err){
        console.log("Not connected!",err);
    }
    else {
        console.log("Connected to mysql database, now you can go!!!");
    }
});


module.exports = { connection };