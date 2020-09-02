const Balance = require('../models/balance');
const LineItem = require('../models/lineItem');
const utilities = require('../helpers/utilities');
const Bill = require('../models/bill');

module.exports = {
    index,
    new: newBalance,
    create,
    show,
    update
}

function index(req, res) {
    res.redirect('/');
}

function newBalance(req, res) {
    res.render('balances/new', {
        user: req.user
    });
}

function create(req, res) {
    req.body.user = req.user.id;
    req.body.date = Date(req.body.date);
    Balance.create(req.body, err => {
        res.redirect('/dashboard');
    });
}

function show(req, res) {
    Balance.findById(req.params.id, function(err, balance) {
        if(!balance) res.redirect('/dashboard');
        if(!req.user._id.equals(balance.user)) res.redirect(`/dashboard`);
        const balanceDate = utilities.formatDate(balance.date);
        LineItem.find({ balance: balance.id }, (err, lineItems) => {
            let lineItemTotal = 0;
            lineItems.forEach(item => lineItemTotal += item.paymentAmount);
            const runningBalance = (balance.startingBalance - lineItemTotal).toFixed(2);
            res.render('balances/show', {
                user: req.user,
                balance,
                lineItems,
                balanceDate,
                runningBalance
            });
        }).populate('bill');
    });
}

function update(req, res) {
    Balance.findById(req.params.id, function(err, balance) {
        if(!req.user._id.equals(balance.user)) res.redirect(`/dashboard`);
        balance.date = req.body.date;
        balance.startingBalance = req.body.startingBalance;
        balance.notes = req.body.notes;
        balance.save(err => {
            res.redirect(`/balances/${req.params.id}`);
        });
    });
}