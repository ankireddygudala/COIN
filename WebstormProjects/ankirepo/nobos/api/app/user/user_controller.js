const express = require('express');

const pool = require('./../../db/connection'); //getting the db connection
const utils = require('./utils');
const ethWallet = require('./../../eth/wallet');
const { generateAuthToken, authenticate } = require('../../auth/authentication');

const router = express.Router();


/* GET users listing. */
router.get('/', function(req, res) {
    res.send('This is user route...');
});

//REST API to get user details
router.get('/get-user',authenticate, (req, res)=>{

    //receive input parameters
    let userId = req.user_id;
    let email = req.email;

    pool.getConnection(function (err, connection) {

        //if error found, return error status
        if(err) {
            return res.json({
                result: false,
                message:"Internal error",
                error: err
            })
        }

        //get user with given email or id
        let sql = "select user.id, user.name, user.email, user.referral_code,user.token_amount, user.referral_earning, user.date_of_update, user.is_deleted, user.google_auth, user.email_verification, address.address from user, address where user.id = ? AND address.user_id = ?";
        connection.query(sql, [userId, userId], function (err, result) {
            if(err) {
                return res.json({
                   result: false,
                   message:"Internal error occured",
                   error:err
                });
            }
            else if(!result.length){
                return res.json({
                    result: false,
                    message:"No user found with the given details",
                    error: null
                })
            }

            // return user
            res.json({
                result: true,
                message: "user found",
                user: result[0]
            })
        });


        connection.release();
    });


});

//REST API to all users
router.get('/get-allUsers', (req, res)=>{

    pool.getConnection(function (err, connection) {

        //if error found, return error status
        if(err) {
            return res.json({
                result: false,
                message:"Internal error",
                error: err
            })
        }

        //get user with given email or id
        let sql = "select a.*, b.address, b.coin_type from user a inner join address b on a.id = b.user_id";
        connection.query(sql, function (err, result) {
            if(err) {
                return res.json({
                    result: false,
                    message:"Internal error occured",
                    error:err
                });
            }
            else if(!result.length){
                return res.json({
                    result: false,
                    message:"No user found with the given details",
                    error: null
                })
            }

            // return user
            res.json({
                result: true,
                message: "users list",
                users: result
            })
        });


        connection.release();
    });


});


/* REST Api to create new user */
router.post('/create-user',(req, res)=>{

    //get the user input data from the req obj
    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;
    let mobile = req.body.mobile;



    //generate referral link for the user
    let referral_link = utils.generateReferralCode();
    let hashPassword = utils.bctyptPassword(password);

    var record = {
       name:name,
       email:email,
       referral_code:referral_link,
       password:hashPassword
    };


    //connect to db and store
    pool.getConnection(function (err, connection) {

        if(err) {
            return res.json({
                result: false,
                message:"Internal database error",
                error:err
            })
        }
        // check user email exist or not
        connection.query('select * from user where email = ?',[email], function (err, rows) {
            if(err) {
                return res.json({
                    result: false,
                    message:"Internal database error",
                    error:err
                })
            }
            if (rows.length){
                return res.json({
                    result: false,
                    message:"user already exist with given email",
                    error: null
                })
            }

            // if user email not exist insert into db
            connection.query('insert into user set ?', record, function (err, result) {
                if(err) {
                    return res.json({
                        result: false,
                        message:"Internal database error",
                        error:err
                    })
                }
                else if(result.affectedRows === 0) {
                    return res.json({
                        result: false,
                        message: 'Failed to modify in database',
                        error: null
                    })
                }

                //if user inserted into db
                res.json({
                    result:true,
                    message:"User created",
                    user: result.insertId,

                })

            });
        });

       connection.release(); //release connection
    });

});

//REST API to create ether wallet
router.post('/create-eth-wallet', (req, res)=>{

    // receive input parameters
    let userId = req.body.id;
    let email = req.body.email;
    let password = req.body.password;

    pool.getConnection(function (err, connection) {
        if(err){
            return res.json({
                result: false,
                message:"Internal error occured!",
                error:err
            })
        }

        //check user exist in the db
        connection.query('select * from user where id = ? OR email = ?',[userId, email], function (err, result) {
            if (err) {
                return res.json({
                    result: false,
                    message:"Internal error",
                    error:err
                })
            }
            else if(!result.length) {
                return res.json({
                    result:false,
                    message:"No user found with given details",
                    error:null
                })
            }
            else {
                // user found then create eth waller for user
                // get the address of wallet
                let address = ethWallet.createEtherWallet(password);
                let record = {
                  user_id:result[0].id,
                  address:address,
                  coin_type:'e'
                };
                connection.query('insert into address set ?', record, function (err, row) {
                    if (err) {
                        return res.json({
                            result: false,
                            message:"Internal error",
                            error:err
                        })
                    }
                    if(row.affectedRows) {
                        return res.json({
                            result:true,
                            message:"Ether wallet created successfully",
                            address:address
                        });
                    }
                     else{
                        return res.json({
                            result:false,
                            message:"Failed to modify database",
                            error:null
                        })
                     }

                });

            }

            // if no user found then return error message

        });

        connection.release();
    })

});

//REST API to login service
router.post('/user-login', (req, res)=> {

    let email = req.body.email;
    let password = req.body.password;

    //query to retrive user data from data base
    pool.getConnection(function (err, connection) {
        if (err) {
            return res.json({
                result: false,
                message: 'Failed to connect database',
                error: err
            })
        }
        //compare old password
        connection.query('select * from user where email = ?',[email], function (err, result) {
            if (err) {
                return res.json({
                    result: false,
                    message: 'internal error',
                    error: err
                })
            }
            if(!result.length) {
                return res.json({
                    result:false,
                    message:"No user found with given details",
                    err:null
                })
            }
            if(utils.comparePassword(password, result[0].password)) {

                //generate authentication web token
                let token = generateAuthToken(result[0].id, email);
                connection.query('update user set auth_token = ? where email = ?',[token, email], function (err1, rows) {
                    if(err1){
                        return res.json({
                            result: false,
                            message: 'an error occured!',
                            error: err1
                        });
                    }else if(rows.affectedRows === 0){
                        return res.json({
                            result: false,
                            message: 'failed to modify in database',
                            error: null
                        })
                    }
                    else {
                        return res.json({
                            result: true,
                            message: 'login success',
                            token: token,
                            userId: result[0].id,
                            role:  (result[0].user_type === 1) ? "admin" : ((result[0].user_type === 2)? "affiliate":"user")
                        });
                    }
                });


            }else{
                return res.json({
                    result: false,
                    message:"Invalid password"
                })
            }


        });

        connection.release();
    });
});

//REST API to check for the referral code
router.post('/referralCode', (req, res)=>{

    let code = req.body.referralCode;

    pool.getConnection(function (err, connection) {
        if(err) {
            return res.json({
                result: false,
                message:"Failed to connect to database",
                error:err
            })
        }
        connection.query('select * from user where referral_code = ?',[code], function (err, result) {
            if(err) {
                return res.json({
                    result: false,
                    message:"Internal error",
                    error:err
                })
            }
            else if(!result.length) {
                return res.json({
                    result: false,
                    message:"Invalid referral code"
                })
            }
            else{
                return res.json({
                    result:true,
                    message:"Referral code correct!",
                    userId: result[0].id
                })
            }
        });

        connection.release();
    })

});

//REST API to check for email verification
router.post('/verifyEmail', (req, res)=>{
   let id = req.body.id;

   pool.getConnection(function (err, connection) {
       if(err) {
           return res.json({
               result: false,
               message:"Failed to connect to the database",
               error:err
           })
       }

       connection.query('select id, email, email_verification from user where id = ?',[id], function(err, result){

           if(err) {
               return res.json({
                   result: false,
                   message:"Internal error",
                   error:err
               })
           }
           else if(!result.length){
               return res.json({
                   result: false,
                   message:"No user found with given id"
               })
           }
           else {
               return res.json({
                   result:true,
                   message:"User found",
                   user:result[0]
               })
           }
       });
       connection.release();
   })
});

//REST API to update user details
router.put('/update-username', (req, res)=>{

    //receive input parameters
    let id = req.body.id;
    let name = req.body.name;
    let email =req.body.email;

    pool.getConnection(function(err, connection){
        if (err){
            res.json({
                result:false,
                message:'internal error',
                error:err
            })
        }
        connection.query('update user set  name = ? where email = ?',[name, email], function (err, result) {
            if (err) {
                res.json({
                    result: false,
                    message: 'internal error',
                    error: err
                })
            } else if(result.affectedRows === 0){
                res.json({
                    result: false,
                    message: 'failed to modify in database',
                    error: 'an error occured'
                })
            }else {
                res.json({
                    result: true,
                    message:'updated user successfully',
                    user: result
                });
            }
        })
        connection.release();
    })
});

//REST API to update user password
router.put('/update-password', (req, res)=>{

    let email = req.body.email;
    let oldPassword = req.body.oldPassword;
    let newPassword = req.body.newPassword;


    pool.getConnection(function(err, connection){
        if (err){
            return res.json({
                result:false,
                message:'internal error',
                error:err
            })
        }

        //compare old password
        connection.query('select password from user where email = ?',[email], function (err, result) {
            if (err){
                return res.json({
                    result:false,
                    message:'internal error',
                    error:err
                })
            }
            else if(result.length){
                // if user found then check the passwords
                if (utils.comparePassword(oldPassword, result[0].password)){
                    console.log("Congrats you entered correct password!", result[0].password);

                    //update password of user
                    let newPwd = utils.bctyptPassword(newPassword);

                    connection.query('update user set password=? where email=?',[newPwd, email], function (err, rows) {
                        if(err){
                            return res.json({
                                result: false,
                                message:"internal error",
                                error:err
                            })
                        }
                        else if(rows.affectedRows>0){
                            return res.json({
                                result:true,
                                message:"Password updated successfully"
                            })
                        }
                        else{
                            return res.json({
                                result: false,
                                message:"Failed to modify the database",
                                error:null
                            })
                        }
                    })

                }
                else {
                    // if password wrong then return error response
                    return res.json({
                        result: false,
                        message:"Invalid password, please enter correct password!",
                        error: null
                    })

                }
            }
            else{
                // no uesr found with given details

                res.json({
                    result: false,
                    message:"No user found with given details",
                    error:null
                })
            }

        });

        connection.release();
    })
});


//REST API to update user mail
router.put('/update-userEmail', (req, res)=>{

    let id = req.body.id;
    let email = req.body.email;
    let newEmail = req.body.newEmail;

    pool.getConnection(function (err, connection) {
        if (err){
            return res.json({
                result:false,
                message:'Failed to connect to database',
                error:err
            })
        }
        connection.query('update user set email = ? where id=? AND email =?',[newEmail, id, email], function (err, rows) {
            if (err){
                return res.json({
                    result:false,
                    message:'internal error',
                    error:err
                })
            }
            else if(rows.affectedRows>0){
                return res.json({
                    result:true,
                    message:'user email updated successfully'
                })
            } else {
                return res.json({
                    result:false,
                    message:'Failed to modify the database'
                })
            }
        })

    })
});

//REST API to update user email verification
router.put('/verifyEmail', (req, res)=>{
    let id = req.body.id;

    pool.getConnection(function (err, connection) {
        if(err) {
            return res.json({
                result: false,
                message:"Failed to connect to the database",
                error:err
            })
        }

        connection.query('update user set email_verification = ? where id = ?',[1,id], function(err, rows){

            if(err) {
                return res.json({
                    result: false,
                    message:"Internal error",
                    error:err
                })
            }
            else if(!rows.affectedRows){
                return res.json({
                    result: false,
                    message:"No user found with given id"
                })
            }
            else {
                return res.json({
                    result:true,
                    message:"user email verification done"
                })
            }
        });
        connection.release();
    })
});

//REST API to update google auth
router.put('/changeGoogleAuth',authenticate, (req, res)=>{
    let id = req.user_id;

    pool.getConnection(function (err, connection) {
        if(err) {
            return res.json({
                result: false,
                message:"Failed to connect to the database",
                error:err
            })
        }

        connection.query(`update user set google_auth = NOT google_auth where id = ?`,[id], function(err, rows){

            if(err) {
                return res.json({
                    result: false,
                    message:"Internal error",
                    error:err
                })
            }
            else if(!rows.affectedRows){
                return res.json({
                    result: false,
                    message:"No user found with given id"
                })
            }
            else {
                return res.json({
                    result:true,
                    message:"google authentication changed"
                })
            }
        });
        connection.release();
    })
});

//REST API to delete user from the database
router.delete('/user-delete', (req, res)=>{

    //receive query parameters
    let id = req.body.id;
    let email = req.body.email;
    //delete user from the database
    pool.getConnection(function (err, connection) {
        if(err) {
            return res.json({
                result:false,
                message:"Failed to connect to the database",
                error:err
            })
        }

        let sql = "DELETE a.*, b.* FROM user a LEFT JOIN address b ON b.user_id = a.id WHERE a.id = ?";
        connection.query(sql,[id], function (err, rows) {
            if(err) {
                return res.json({
                    result:false,
                    message:"Internal error",
                    error:err
                })
            }
            else if(rows.affectedRows >0 ){
                return res.json({
                    result: true,
                    message:"User deleted successfully"
                })
            }
            else {
                res.json({
                    result: false,
                    message:"Failed to modify the database"
                })
            }
        })
        connection.release();
    })
});


module.exports = router;
