const Balance = require('../models/balance');
const LineItem = require('../models/lineItem');

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
        today: new Date().toISOString().slice(0,10)
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
        if(!balance || !balance.user.equals(req.user._id) || err) return res.redirect(`/`);

        const balanceDate = balance.date.toISOString().slice(0,10);
        
        let lineItemTotal = 0;
        balance.lineItems.forEach(item => lineItemTotal += item.paymentAmount);

        const runningBalance = (balance.startingBalance - lineItemTotal).toFixed(2);

        res.render('balances/show', {
            balance,
            balanceDate,
            runningBalance
        });
    }).populate('lineItems');
}

function update(req, res) {
    Balance.findById(req.params.id, function(err, balance) {
        if(!balance || !balance.user.equals(req.user._id) || err) return res.redirect(`/`);

        balance.date = Date(req.body.date);
        balance.startingBalance = req.body.startingBalance;
        balance.notes = req.body.notes;

        balance.save(err => {
            res.redirect(`/balances/${req.params.id}`);
        });
    });
}