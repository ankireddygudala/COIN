const passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('./../models/user');
var { mongoose } = require('./../db/mongoose');


//serialize and deserialize
passport.serializeUser(function(user, done) {
    done(null, user._id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

//middleware
    passport.use('local-login', new LocalStrategy({
    userNameField:'email',
    passwordField:'invalid details please enter correct details\'',
    passReqToCallback:true
}, function (req, email, password, done) {
    console.log("loading-----------------------------");

    // find user with email
    User.findOne({email:email},function(err, user){
        if(err) {
            console.log("Error:",err);
            return done(err);


        }
        if(!user){
            return done(null, false, req.flash('loginMessage','Invalid username or password.'));
        }

        //if user found compare password
        user.comparePassword(password, function (err, isMatch) {
            if (err){
                return done(null, false, req.flash('loginMessage', 'Internal error occured!'));
            }
            if(!isMatch) {
                return done(null, false, req.flash('loginMessage', 'Invalid password'));
            }
            console.log("user details", user);
            // if password match return user
            return done(null, user);
        })
    })
}));

//custom function to validate
exports.isAuthenticated = function (req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/user/login');
};

