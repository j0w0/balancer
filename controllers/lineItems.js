const Balance = require('../models/balance');
const LineItem = require('../models/lineItem');
const Bill = require('../models/bill');

module.exports = {
    index,
    new: newItem,
    create,
    show,
    update,
    delete: deleteItem
}

function index(req, res) {
    res.redirect('/');
}

function newItem(req, res) {
    const balanceId = req.params.id;
    Balance.findById(balanceId, function(err, balance) {
        if(!balance || !balance.user.equals(req.user._id) || err) return res.redirect(`/`);
        Bill.find({ user: req.user.id }, function(err, bills) {
            res.render('lineItems/new', {
                balanceId,
                bills
            });
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
        lineItem.transactionType = req.body.transactionType;
        lineItem.transactionAmount = req.body.transactionAmount;
        lineItem.notes = req.body.notes;

        lineItem.bill = req.body.bill === '' ||
            req.body.transactionType === "Deposit" ?
            null : req.body.bill;

        lineItem.save(err => {
            res.redirect(`/balances/${lineItem.balance.id}`);
        });
    }).populate('balance');
}

function deleteItem(req, res) {
    const lineItemId = req.params.id;

    // remove line item, pass obj down
    LineItem.findByIdAndRemove(lineItemId, (err, lineItem) => {
        if(!lineItem || !lineItem.user.equals(req.user._id) || err) return res.redirect(`/`);
        const balanceId = lineItem.balance.id;

        // find parent
        Balance.findById(balanceId, function(err, balance) {

            // remove line item ref in balance (parent)
            balance.lineItems.remove(lineItemId);
            balance.save(err => {
                res.redirect(`/balances/${balanceId}`);
            });
        });
    }).populate('balance');
}