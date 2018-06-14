const mysql = require('mysql');


const pool  = mysql.createPool({
    connectionLimit : 15,
    user:'root',
    host:'128.199.129.139',
    password:'AKT@2018',
    database:'nobos',
    port: 3306
});


module.exports =  pool ;
