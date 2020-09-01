const Budget = require('../models/budget');
const Bill = require('../models/bill');

module.exports = {
    new: newBill,
    create,
    show,
    update
}

function newBill(req, res) {
    res.render('bills/new', {
        user: req.user,
        budgetId: req.params.id
    });
}

function create(req, res) {
    const budgetId = req.params.id;
    req.body.budget = budgetId;
    Bill.create(req.body, err => {
        if(err) res.render('bills/new', {
            user: req.user,
            budgetId
        });
        res.redirect(`/budgets/${budgetId}`);
    });
}

function show(req, res) {
    Bill.findById(req.params.id, function(err, bill) {
        res.render('bills/show', {
            user: req.user,
            bill
        });
    });
}

function update(req, res) {
    Bill.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        dueDate: req.body.dueDate,
        autoPay: req.body.autoPay,
        autoPayAccount: req.body.autoPayAccount,
        total: req.body.total,
        url: req.body.url
    }, function(err, bill) {
        res.redirect(`/budgets/${bill.budget}`);
    });
}