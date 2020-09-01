var express = require('express');
var router = express.Router();
const balancesCtrl = require('../controllers/balances');
const lineItemsCtrl = require('../controllers/lineItems');

// LINE-ITEMS

router.get('/', isLoggedIn, function(req, res) {
  res.send('respond with a resource');
});

function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()) return next();
  res.redirect('/auth/google');
}

module.exports = router;
