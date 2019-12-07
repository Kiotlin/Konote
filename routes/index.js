var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Konote' });
});

router.get('/login', function(req, res, next){
  res.render('login', { title: 'Sign in to Konote · Konote' });
});

router.get('/register', function(req, res, next){
  res.render('register', { title: 'Join Konote · Konote' });
});

module.exports = router;
