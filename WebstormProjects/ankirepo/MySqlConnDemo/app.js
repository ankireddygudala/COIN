var { connection } = require('./connection');


var createDatabase = "create database userDatabase";
var createTable = "create table userDetails (id INT(10), name VARCHAR(50), age INT(3))";
var sql = "CREATE TABLE customers (name VARCHAR(255), address VARCHAR(255))";

var email = 'syam@gmail.com';
connection.query('SELECT * FROM users WHERE email = ?', [email], function (error, results, fields) {
    if (error){
        console.log(error)
    }
    else if(results.length == 0){
        console.log("No user found with email");
    }
    else {
        var res = results[0];
        console.log("user found", results[0].password);
        console.log("user: ", results);
    }


});
// creatig database
// connection.query(createDatabase, function (err, res) {
//
//     if(err){
//         console.log('Something went wrong!!!');
//     }
//     else{
//         console.log("New datebase created!!!", res);
//         connection.query('show databases', function (err, result) {
//             console.log("Current databases: ",result);
//         })
//     }
// });


// connection.query("insert into userdetails (id, name, age) values (10, 'Anki Reddy', 24)", function (err, result) {
//     if(err){
//         console.log('Error', err.stack);
//     }
//     else{
//         console.log('Data inserted into userdetails!!!');
//         connection.query("select * from userdetails", function (err, res) {
//             console.log(res);
//             console.log(JSON.stringify(res, undefined, 3));
//             // console.log(arr[0]);
//         });
//
//     }
// });
// connection.query('SELECT 1', function (error, results, fields) {
//     if (error) throw error;
//     // connected!
//     console.log(results);
// });