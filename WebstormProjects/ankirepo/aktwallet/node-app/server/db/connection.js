var mysql = require('mysql');


var pool  = mysql.createPool({
    connectionLimit : 15,
    user:'root',
    host:'localhost',
    password:'',
    database:'affiliate',
    port: 3306
});

//
// pool.getConnection(err, connection){
//     if(err){
//         console.log('db not connected!');
//     }
//     else {
//         console.log('db connected!');
//     }
//
// }
//     user:'root',
//     host:'localhost',
//     password:'',
//     database:'affiliate'

//
// host:'affiliate-wallet.cjbxcskjv2nq.us-east-2.rds.amazonaws.com',
//     user:'ankireddy',
//     password:'Amrutha$ajay2',
//     database:'affiliate',
//     port: 3306
module.exports =  pool ;
