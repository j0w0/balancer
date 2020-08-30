var express = require('express');
var router = express.Router();
const passport = require('passport');
const usersCtrl = require('../controllers/index');

router.get('/', usersCtrl.index);

router.get('/auth/google', passport.authenticate(
  'google',
  { scope: [ 'profile', 'email' ] }
));

router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect: '/',
    failureRedirect: '/'
  }
));

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
