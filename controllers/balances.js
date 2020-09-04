const Balance = require('../models/balance');
const LineItem = require('../models/lineItem');

module.exports = {
    index,
    new: newBalance,
    create,
    show,
    update,
    delete: deleteBalance
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
    if(req.body.startingBalance === '') delete req.body.startingBalance;
    Balance.create(req.body, err => {
        res.redirect('/dashboard');
    });
}

function show(req, res) {
    Balance.findById(req.params.id, function(err, balance) {
        if(!balance || !balance.user.equals(req.user._id) || err) return res.redirect(`/`);

        LineItem.find({ balance: req.params.id }, function(err, lineItems) {

            const balanceDate = balance.date.toISOString().slice(0,10);

            let runningBalance = balance.startingBalance;

            balance.lineItems.forEach(item => {
                if(item.transactionType === 'Withdrawal') {
                    runningBalance -= item.transactionAmount;
                } else {
                    runningBalance += item.transactionAmount;
                }
            });

            runningBalance = runningBalance.toFixed(2);

            res.render('balances/show', {
                balance,
                balanceDate,
                runningBalance,
                lineItems
            });
        }).populate('bill');
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

function deleteBalance(req, res) {
    const balanceId = req.params.id;
    // remove balance and all ref'ed line items
    Balance.findByIdAndRemove(balanceId, (err, balance) => {
        if(!balance || !balance.user.equals(req.user._id) || err) return res.redirect(`/`);
        LineItem.deleteMany({ balance: balanceId }, function(err, lineItems) {
            res.redirect(`/dashboard`);
        });
    });
}