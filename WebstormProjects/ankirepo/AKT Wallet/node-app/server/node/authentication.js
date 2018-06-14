var jwt = require('jsonwebtoken');

const config = require('./../db/config');

var generateAuthToken = function (name, email) {

    var token = jwt.sign({ name: name, email: email }, config.secret, { expiresIn:3600 });
    return token;
};


// authenticating user
var authenticate = function (req, res, next) {

    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    // decode token
    if (token) {

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
                req.username = decoded.name;
                req.token = token;

                next();
            }
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


module.exports = { generateAuthToken, authenticate };