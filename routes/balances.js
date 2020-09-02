var express = require('express');
var router = express.Router();
const balancesCtrl = require('../controllers/balances');
const lineItemsCtrl = require('../controllers/lineItems');

// BALANCES

router.get('/', isLoggedIn, balancesCtrl.index);
router.get('/new', isLoggedIn, balancesCtrl.new);
router.post('/', isLoggedIn, balancesCtrl.create);
router.get('/:id', isLoggedIn, balancesCtrl.show);
router.put('/:id', isLoggedIn, balancesCtrl.update);

router.get('/:id/line-items/new', isLoggedIn, lineItemsCtrl.new);
router.post('/:id/line-items', isLoggedIn, lineItemsCtrl.create);

function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()) return next();
  res.redirect('/auth/google');
}

module.exports = router;
