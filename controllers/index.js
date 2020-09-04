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

                let runningBalance = balance.startingBalance;
                
                balance.lineItems.forEach(item => {
                    if(item.transactionType === 'Withdrawal') {
                        runningBalance -= item.transactionAmount;
                    } else {
                        runningBalance += item.transactionAmount;
                    }
                });
                
                balance.runningBalance = runningBalance.toFixed(2);
            });

            const emojis = [
                '🔥','👋🏼','😎', '🤖', '🥳', '🤘🏼'
            ];

            const random = Math.floor(Math.random() * emojis.length);

            res.render('dashboard', {
                budgets,
                balances,
                randomEmoji: emojis[random]
            });
        }).populate('lineItems');
    }).populate('bills');
}