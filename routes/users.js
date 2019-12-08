var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var User = require('../models/user');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/:username', function(req, res, next) {

  // connect to MongoDB
  mongoose.connect("mongodb://localhost:27017/konote", { useNewUrlParser: true });

  User.findOne({ username: req.params.username }, function(err, user) {
    if(err) { return next(err); }
    if(!user) { return next(404); }
    res.render('notebook', { user: user });
  });
});

module.exports = router;
