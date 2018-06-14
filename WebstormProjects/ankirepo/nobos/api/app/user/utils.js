const shortId = require('shortid');
const bcrypt = require('bcryptjs');

const pool = require('./../../db/connection');

//method to generate referral code
exports.generateReferralCode =  function () {
    return shortId.generate();
};

//method to generate hashed password from plain text
exports.bctyptPassword = function (password) {

    let salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
};

//method to compare password
exports.comparePassword = function (password, hash) {
    return bcrypt.compareSync(password, hash);
};





