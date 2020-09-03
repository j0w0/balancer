var express = require('express');
var router = express.Router();
const budgetsCtrl = require('../controllers/budgets');
const billsCtrl = require('../controllers/bills');

// BUDGETS

router.get('/', isLoggedIn, budgetsCtrl.index);
router.get('/new', isLoggedIn, budgetsCtrl.new);
router.post('/', isLoggedIn, budgetsCtrl.create);
router.get('/:id', isLoggedIn, budgetsCtrl.show);
router.put('/:id', isLoggedIn, budgetsCtrl.update);

router.get('/:id/bills/new', isLoggedIn, billsCtrl.new);
router.post('/:id/bills', isLoggedIn, billsCtrl.create);

function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()) return next();
  res.redirect('/auth/google');
}

module.exports = router;
