const User = require('../models/user');
const Category = require('../models/category');
const Budget = require('../models/budget');
const Bill = require('../models/bill');
const Balance = require('../models/balance');
const LineItem = require('../models/lineItem');
const utilities = require('../helpers/utilities');

module.exports = {
    index,
    dashboard
}

function index(req, res) {    
    if(req.user) return res.redirect('/dashboard');
    res.render('index', {});
}

function dashboard(req, res) {
    Budget.find({ user: req.user._id }, function(err, budgets) {
        Balance.find({ user: req.user._id }, function(err, balances) {

            balances.forEach((balance, idx) => {
                balance.dateFormatted = utilities.formatDate(balance.date);

                let lineItemTotal = 0;
                
                balance.lineItems.forEach(lineItem => {
                    lineItemTotal += lineItem.paymentAmount;
                });

                const runningBalance = balance.startingBalance - lineItemTotal;
                balance.runningBalance = runningBalance.toFixed(2);
            });

            res.render('dashboard', {
                budgets,
                balances
            });
        }).populate('lineItems');
    }).populate('bills');
}