const jwt = require('jsonwebtoken');

const config = require('../../config/config');
const pool = require('../db/connection');

//generating jwt token
var generateAuthToken = function (id, email) {

    return jwt.sign({ id: id, email: email }, config.secret, { expiresIn:7200 })
};

//validate token
var authenticate = function (req, res, next) {

    // check header or url parameters or post parameters for token
    let token = req.body.token || req.query.token || req.headers['x-access-token'];
    // decode token
    if (token) {

        pool.getConnection(function (err, connection) {

            if(err){
                return res.json({
                    result:false,
                    message:"Failed to connect to database",
                    error:err
                })
            }
            connection.query('select * from user where auth_token = ?',[token], function (err, rows) {
                if(err){
                    return res.json({
                        result:false,
                        message:"Internal error",
                        error:err
                    })
                }
                if(rows.length){
                    // verifies secret and checks exp
                    jwt.verify(token, config.secret, function(err, decoded) {
                        if (err) {
                            return res.json({
                                status: 'failed',
                                message: 'Failed to authenticate token.'
                            });
                        } else {
                            // if everything is good, save to request for use in other routes
                            req.decoded = decoded;
                            req.email = decoded.email;
                            req.user_id = decoded.id;
                            req.token = token;

                            next();
                        }
                    });
                }
                else {
                    return res.json({
                        result:false,
                        message:"Invalid authentication token"
                    })
                }
            })
            connection.release();
        });

    } else {

        // if there is no token
        // return an error
        return res.status(403).json({
            status: 'failed',
            message: 'No token provided.'
        });

    }

};


//method to authenticate user
module.exports = { generateAuthToken, authenticate };