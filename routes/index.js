var express = require('express');
var router = express.Router();
const passport = require('passport');
const rootCtrl = require('../controllers/index');
const categoriesCtrl = require('../controllers/categories');

// ROOT

router.get('/', rootCtrl.index);
router.get('/dashboard', isLoggedIn, rootCtrl.dashboard);

router.get('/auth/google', passport.authenticate(
  'google',
  { scope: [ 'profile', 'email' ] }
));

router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect: '/dashboard',
    failureRedirect: '/'
  }
));

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()) return next();
  res.redirect('/auth/google');
}

module.exports = router;
