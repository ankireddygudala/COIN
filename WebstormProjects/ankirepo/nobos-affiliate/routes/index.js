var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.cookie('locale', 'jp', { maxAge: 900000, httpOnly: true });
  res.render('index', { title: 'Express' });
});

module.exports = router;
