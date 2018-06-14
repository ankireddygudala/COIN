var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.cookie('locale', 'en', { maxAge: 900000, httpOnly: true });
    res.render('index', { title: 'Express' });
});
module.exports = router;
