const Balance = require('../models/balance');
const LineItem = require('../models/lineItem');
const Bill = require('../models/bill');

module.exports = {
    index,
    new: newItem,
    create,
    show,
    update
}

function index(req, res) {
    res.redirect('/');
}

function newItem(req, res) {
    Bill.find({ user: req.user.id }, function(err, bills) {
        res.render('lineItems/new', {
            user: req.user,
            balanceId: req.params.id,
            bills
        });
    });
}

function create(req, res) {
    Balance.findById(req.params.id, function(err, balance) {
        if(!req.user._id.equals(balance.user)) res.redirect(`/dashboard`);
        req.body.balance = balance.id;
        req.body.user = req.user.id;
        LineItem.create(req.body, err => {
            if(err) res.render('line-items/new', {
                user: req.user,
                balanceId: balance.id
            });
            res.redirect(`/balances/${balance.id}`);
        });
    });
}

function show(req, res) {
    LineItem.findById(req.params.id, function(err, lineItem) {
        if(!req.user._id.equals(lineItem.user)) res.redirect(`/dashboard`);
        Bill.find({ user: req.user.id }, function(err, bills) {
            res.render('lineItems/show', {
                user: req.user,
                lineItem,
                bills
            });
        });
    }).populate('bill');
}

function update(req, res) {
    LineItem.findById(req.params.id, function(err, lineItem) {
        if(!req.user || !req.user._id.equals(lineItem.user)) res.redirect(`/dashboard`);
        lineItem.name = req.body.name;
        lineItem.bill = req.body.bill;
        lineItem.paymentAmount = req.body.paymentAmount;
        lineItem.notes = req.body.notes;
        lineItem.save(err => {
            res.redirect(`/balances/${lineItem.balance}`);
        });
    });
}