var express = require('express');
var router = express.Router();
const budgetsCtrl = require('../controllers/budgets');
const billsCtrl = require('../controllers/bills');

// BILLS

router.get('/:id', isLoggedIn, billsCtrl.show);
router.put('/:id', isLoggedIn, billsCtrl.update);

function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()) return next();
  res.redirect('/auth/google');
}

module.exports = router;
