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
        if(!bills || !bills[0].user.equals(req.user._id) || err) return res.redirect(`/`);

        res.render('lineItems/new', {
            balanceId: req.params.id,
            bills
        });
    });
}

function create(req, res) {
    Balance.findById(req.params.id, function(err, balance) {
        if(!balance || !balance.user.equals(req.user._id) || err) return res.redirect(`/`);

        const balanceId = balance.id;
        req.body.balance = balanceId;
        req.body.user = req.user.id;

        if(req.body.transactionAmount === '') delete req.body.transactionAmount;

        // create new line item
        const newLineItem = new LineItem(req.body);

        newLineItem.save(err => {

            // add new line item to balance (parent)
            balance.lineItems.push(newLineItem.id);

            balance.save(err => {
                if(err) res.render('line-items/new', { balanceId });
                res.redirect(`/balances/${balanceId}`);
            });
        });
    });
}

function show(req, res) {
    LineItem.findById(req.params.id, function(err, lineItem) {
        if(!lineItem || !lineItem.user.equals(req.user._id) || err) return res.redirect(`/`);
        
        // get all bills to show in dropdown
        Bill.find({ user: req.user.id }, function(err, bills) {
            res.render('lineItems/show', {
                lineItem,
                bills
            });
        });
    }).populate('bill');
}

function update(req, res) {
    LineItem.findById(req.params.id, function(err, lineItem) {
        if(!lineItem || !lineItem.user.equals(req.user._id) || err) return res.redirect(`/`);

        lineItem.name = req.body.name;
        lineItem.bill = req.body.bill === '' ? null : req.body.bill;
        lineItem.transactionType = req.body.transactionType;
        lineItem.transactionAmount = req.body.transactionAmount;
        lineItem.notes = req.body.notes;
        
        lineItem.save(err => {
            res.redirect(`/balances/${lineItem.balance.id}`);
        });
    }).populate('balance');
}