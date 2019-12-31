var express = require('express');
var passport = require('passport');
var User = require('../models/user');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Konote' });
});

router.get('/notebook', function(req, res, next) {
  res.render('notebook');
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Sign in to Konote · Konote' });
});

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

// user login
router.post('/login', passport.authenticate("login", {

  successRedirect: "/users",
  failureRedirect: "/login",
  failureFlash: true

}));

router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Join Konote · Konote' });
});

router.get('/welcome', function(req, res) {
  res.render('utils/welcome');
});

// user register
router.post('/register', function(req, res, next) {
  
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

    // redirect to success page
    res.redirect('/welcome');
  });
});

module.exports = router;
