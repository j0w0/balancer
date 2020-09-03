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

        const balanceId = balance.id;
        req.body.balance = balanceId;
        req.body.user = req.user.id;

        // create new line item
        const newLineItem = new LineItem(req.body);

        newLineItem.save(err => {

            // add new line item to balance (parent)
            balance.lineItems.push(newLineItem.id);

            balance.save(err => {
                if(err) res.render('line-items/new', {
                    user: req.user,
                    balanceId
                });
                res.redirect(`/balances/${balanceId}`);
            });
        });
    });
}

function show(req, res) {
    LineItem.findById(req.params.id, function(err, lineItem) {
        if(!req.user._id.equals(lineItem.user)) res.redirect(`/dashboard`);
        
        // get all bills to show in dropdown
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
        if(!req.user._id.equals(lineItem.user)) res.redirect(`/dashboard`);

        lineItem.name = req.body.name;
        lineItem.bill = req.body.bill;
        lineItem.paymentAmount = req.body.paymentAmount;
        lineItem.notes = req.body.notes;
        
        lineItem.save(err => {
            res.redirect(`/balances/${lineItem.balance.id}`);
        });
    }).populate('balance');
}