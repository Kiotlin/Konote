var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var User = require('../models/user');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Konote' });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Sign in to Konote · Konote' });
});

router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Join Konote · Konote' });
});

router.post('/register', function(req, res, next) {

  // connect to MongoDB
  mongoose.connect("mongodb://localhost:27017/konote", { useNewUrlParser: true });
  
  // analyse register data
  var username = req.body.username;
  var email = req.body.email;
  var password = req.body.password;

  // chech the database if the user has already existed or just create a new user
  User.findOne({ username: username }, function(err, user) {

    if(err) { return next(err); }

    // if exists or not
    if(user) {
      // req.flash("error", "user already exists.");
      return res.send("user already existed");
    }

    // create a new user
    var newUser = {
      username: username,
      email: email,
      password: password,
      displayName: ""
    };

    // insert in database
    User.create(newUser, function(err, newUser) {
      if(err) return console.log(err);
      console.log('success: ' + newUser);
    });

    next();
  });
  // redirect to login page
}, passport.authenticate("login", {
  successRedirect: "/login",
  failureRedirect: "/register",
  failureFlash: true
}));

module.exports = router;
