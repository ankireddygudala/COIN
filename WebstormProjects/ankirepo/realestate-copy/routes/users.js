const express = require('express');
const router = express.Router();
const passport = require('passport');

var { mongoose } = require('./../db/mongoose');
var  User = require('./../models/user');
const passportConf = require('./../config/passport');


/* GET users listing. */
router.get('/signup', (req, res, next)=> {
    res.render('user/main/signup',{
        errors: req.flash('errors'),
        title:"realestate | user | signup"
    });
});

// GET user login route
router.get('/login', (req, res, next)=> {

    if (req.user) return res.redirect('/user/dashboard');

    res.render('user/main/login',{
        i18n:res,
        title:"realestate | user | login",
        message: req.flash('loginMessage')
    });
});

router.get('/dashboard', (req, res, next)=>{

    if(!req.user) {
        return res.redirect('login');
    }
    User.findOne({_id:req.user._id}, (err, user) =>{
       if(err) {
           next(err);
       }
       if(user){
           res.render('user/main/dashboard', {
               user:user,
               title: "user | dashboard"
           })
       }
    });
});

// Logout request
router.get('/logout', (req, res)=>{
    req.logout();
    res.redirect('/');
});


/* POST method to create user */
router.post('/signup', (req, res)=>{

    var user = new User({
        email:req.body.email,
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        password:req.body.password
    });
    console.log("User:", user);

    User.findOne({email:req.body.email},(err, result)=>{
        if(result){
            req.flash('errors', "Account with that email already exists.");
            return res.redirect('/user/signup');
        }
        // save the user
        user.save((err, user)=>{
            if (err) {
                req.flash('errors', err);
                return res.redirect('/user/signup');
            }

            console.log('User created!');

            setTimeout(function () {
                res.redirect('/user/login');
            },1000);
        })

    })
});

//REST API to login user
router.post('/login',passport.authenticate('local-login', {
    failureRedirect: '/user/login',
    successRedirect:'/user/dashboard',
    failureFlash:true
    })
);
module.exports = router;
