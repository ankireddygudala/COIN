const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
var shortid = require('shortid');
var axios = require('axios');

var router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const  pool  = require('./../../db/connection');
const { generateAuthToken, authenticate } = require('./../../node/authentication');
const config = require('./../../db/config');



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

router.post('/getEtherAddress', function (request, res) {

    var userId  = request.body.userId;
    pool.getConnection(function(err, connection) {
        if (err){
            return res.status(401).json({
                status:false,
                message:'internal error',
                error:err
            })
        }
        connection.query('select * from address where user_id = ?', [userId], function (err, results) {
            if (err) {
                return res.status(500).json({
                    status: false,
                    message: 'internal error',
                    error: err
                })
            }else if(results.length == 0){
                return res.status(500).json({
                    status: false,
                    message: 'no user found with provided token',
                    error: 'invalid auth_token'
                })
            }else {
                res.status(200).json({
                    status: true,
                    user: results
                });
            }
        });
        connection.release();
    })


});

router.post('/login', function (req, res){

    console.log('Login requested', req.body);
    //receive input parameters
    var email = req.body.email;
    var password = req.body.password;

    //query to retrive user data from data base
    pool.getConnection(function(err, connection){
         if (err){
           return res.status(401).json({
                status:false,
                message:'internal error',
                error:err
            })
        }

        connection.query({
            sql: 'SELECT * FROM user WHERE email = ?',
            timeout: 40000
        }, [email], function (error, results, fields) {
            if (error){
              return  res.status(500).json({
                    status: false,
                    message:'an internal error',
                    error: error
                });
            }
            else if(results.length == 0){
                return res.status(401).json({
                    status: false,
                    message: 'unauthorized user',
                    error:'no data found'
                })
            }
            else {
                bcrypt.compare(password, results[0].password, function (err, result) {
                    if (err) {
                        return res.status(500).json({
                            status: false,
                            message: 'an error occured',
                            error: err
                        })

                    }
                    if( result !== true ){
                      return  res.status(401).json({
                            status: false,
                            message: 'Authentication failed, invalid details.'
                        });
                    }

                    var token = generateAuthToken(results[0].name, email, config.secret );
                    connection.query('update user set auth_token = ? where email = ?',[token, email], function (err1, result) {
                        if(err1){
                            return res.status(500).json({
                                status: false,
                                message: 'an error occured!',
                                error: err1
                            });
                        }else if(result.affectedRows == 0){
                            return res.status(500).json({
                                status: false,
                                message: 'failed to modify in database',
                                error: 'an error occured'
                            })
                        }
                        else {
                            return res.status(200).json({
                                status: true,
                                message: 'successfully login',
                                token: token,
                                userId: results[0].id
                            });
                        }
                    });

                });
            }

        });

        connection.release();

    });

});

router.post('/signup', function (request, res ) {
    console.log('Signup requested!!!');
    var fullname = request.body.fullname;
    var email = request.body.email;
    var password = request.body.password;


    var tokenAmount = 0;

    // request api to generate address
    axios.post('http://localhost:3000/api/eth/createNewAccount',{
        password: password
    })
        .then(function (resultAddr) {

            walletAddress = resultAddr.data.address;

            //  var authToken = generateAuthToken(fullname, email, config.secret);
            var ref_code = shortid.generate();

            //generating hashed password
            var hashedPassword = bcrypt.hashSync(password, 10);

            var record= {
                name: fullname,
                email: email,
                password: hashedPassword,
                referral_code: ref_code,
                token_amt: tokenAmount

            };
            pool.getConnection(function(err, connection) {
                if (err){
                    return res.json({
                        status:false,
                        message:'internal error',
                        error:err
                    })
                }

                connection.query('INSERT INTO user SET  ?', record, function (err, result) {
                    if (err) {
                        return res.json({
                            status: false,
                            message: 'An error occured!',
                            error: err
                        });

                    }else if(result.affectedRows == 0){
                         return res.json({
                            status: false,
                            message: 'failed to modify in database',
                            error: 'an error occured'
                        })
                    }
                    else {
                        connection.query('insert into address set ?', {
                            user_id: result.insertId,
                            address: walletAddress,
                            coin_type:'e'
                        }, function (error, result1){
                            if(error){
                                return res.json({
                                    status: false,
                                    message: 'An error occured!',
                                    error: error
                                });
                            }else if(result1.affectedRows == 0){
                               return  res.json({
                                    status: false,
                                    message: 'failed to modify in database',
                                    error: 'an error occured'
                                })
                            }
                            res.json({
                                status: true,
                                message: "User created",
                                userId: result.insertId
                            });
                        });


                    }
                });
                connection.release();
            })

        })
        .catch(function(er) {
            console.log(er);
             res.json({
                status: false,
                message: 'An error occured!',
                error: er.data
            });
        });

   // walletAddress = generateRandomAddress(password); //generated wallet address

});



router.get('/getUser', authenticate, function (req, res) {
    pool.getConnection(function(err, connection) {
        if (err){
            return res.status(401).json({
                status:false,
                message:'internal error',
                error:err
            })
        }
        connection.query('select * from user where auth_token = ?', [req.token], function (err, results) {
            if (err) {
                 return res.status(500).json({
                    status: false,
                    message: 'internal error',
                    error: err
                })
            }else if(results.length == 0){
                return res.status(500).json({
                    status: false,
                    message: 'no user found with provided token',
                    error: 'invalid auth_token'
                })
            }else {
                return res.status(200).json({
                    status: true,
                    user: results
                });
            }
        });
        connection.release();
    })
});

// route to handle update record into database
router.put('/update-password',authenticate, function(req, res){
    pool.getConnection(function(err, connection){
        if (err){
            res.status(401).json({
                status:false,
                message:'internal error',
                error:err
            })
        }
        var hashedPassword = bcrypt.hashSync(req.body.password, 10);

        connection.query('update user set  password = ? where email = ?',[hashedPassword, req.email], function (err, result) {
            if (err) {
                res.status(500).json({
                    status: false,
                    message: 'internal error',
                    error: err
                })
            } else if(result.affectedRows == 0){
                res.status(500).json({
                    status: false,
                    message: 'failed to modify in database',
                    error: 'an error occured'
                })
            }else {
                res.status(200).json({
                    status: true,
                    message:'updated user successfully',
                    user: result
                });
            }
        })
        connection.release();
    })
});
//rest api to update username in database
router.put('/update-username',authenticate, function(req, res){
    pool.getConnection(function(err, connection){
        if (err){
            res.status(401).json({
                status:false,
                message:'internal error',
                error:err
            })
        }
        connection.query('update user set  name = ? where email = ?',[req.body.name, req.email], function (err, result) {
            if (err) {
                res.status(500).json({
                    status: false,
                    message: 'internal error',
                    error: err
                })
            } else if(result.affectedRows == 0){
                res.status(500).json({
                    status: false,
                    message: 'failed to modify in database',
                    error: 'an error occured'
                })
            }else {
                res.status(200).json({
                    status: true,
                    message:'updated user successfully',
                    user: result
                });
            }
        })
        connection.release();
    })
});

// rest api to delete user from the mysql database
router.delete('/delete', authenticate, function (req, res) {
   pool.getConnection(function (err, connection) {
       if (err){
           res.status(401).json({
               status:false,
               message:'internal error',
               error:err
           })
       }
       else{
           connection.query('DELETE FROM user WHERE email = ?',[req.email], function (err, result) {
               if (err) {
                   res.status(500).json({
                       status: false,
                       message: 'internal error',
                       error: err
                   })
               }else if(result.affectedRows == 0){
                   res.status(500).json({
                       status: false,
                       message: 'failed to modify in database',
                       error: 'no user found'
                   })
               } else {
                   res.status(200).json({
                       status: true,
                       message:'user deleted',
                       user: result
                   });
               }
           });
       }
       connection.release();
   });
});
// REST api to logout service
router.put('/logout',authenticate, function(req, res){
    pool.getConnection(function(err, connection){
        if (err){
            res.status(401).json({
                status:false,
                message:'internal error',
                error:err
            })
        }
        connection.query('update user set  auth_token = ? where email = ?',['empty', req.email], function (err, result) {
            if (err) {
                res.status(500).json({
                    status: false,
                    message: 'internal error',
                    error: err
                })
            }else if(result.affectedRows == 0){
                res.status(500).json({
                    status: false,
                    message: 'failed to modify in database',
                    error: 'an error occured'
                })
            } else {
                res.status(200).json({
                    status: true,
                    message:'updated user successfully',
                    user: result
                });
            }
        })
        connection.release();
    })
});

module.exports = router;
