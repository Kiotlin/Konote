var express = require('express');
var passport = require('passport');
var User = require('../models/user');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Success: 200');
});

router.get('/:username', function(req, res, next) {

  User.findOne({ username: req.params.username }, function(err, user) {
    if(err) { return next(err); }
    if(!user) { return next(404); }
    res.render('', { user: user });
  });
});

module.exports = router;
