var express = require('express');
var User = require('../models/user');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Success: 200');
});

router.get('/:username/:func', function(req, res, next) {

  User.findOne({ username: req.params.username }, function(err, user) {
    if(err) { return next(err); }
    if(!user) { return next(404); }

    if(req.params.func === 'create') {
      res.render('user/create', { user: user });  
    }
    if(req.params.func === 'profile') {
      res.render('user/profile', { user: user });
    }
    if(req.params.func === 'calendar') {
      res.render('user/calendar', { user: user });
    }

  });
});

module.exports = router;
