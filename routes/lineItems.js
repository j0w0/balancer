var express = require('express');
var router = express.Router();
const balancesCtrl = require('../controllers/balances');
const lineItemsCtrl = require('../controllers/lineItems');

// LINE-ITEMS

router.get('/', isLoggedIn, lineItemsCtrl.index);
router.get('/:id', isLoggedIn, lineItemsCtrl.show);
router.put('/:id', isLoggedIn, lineItemsCtrl.update);

function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()) return next();
  res.redirect('/auth/google');
}

module.exports = router;
