var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.get('/login', function (req, res) {
   res.render('user/login',{

   })
});

router.get('/signup', function (req, res) {
    res.render('user/signup',{

    })
});

router.get('/dashboard', function (req, res) {
    res.render('user/dashboard',{

    })
});
module.exports = router;
