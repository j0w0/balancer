const Budget = require('../models/budget');
const Bill = require('../models/bill');

module.exports = {
    index,
    new: newBill,
    create,
    show,
    update
}

function index(req, res) {
    res.redirect('/');
}

function newBill(req, res) {
    res.render('bills/new', {
        user: req.user,
        budgetId: req.params.id
    });
}

function create(req, res) {
    Budget.findById(req.params.id, function(err, budget) {
        if(!req.user._id.equals(budget.user)) res.redirect(`/dashboard`);
        req.body.budget = budget.id;
        req.body.user = req.user.id;
        Bill.create(req.body, err => {
            if(err) res.render('bills/new', {
                user: req.user,
                budgetId: budget.id
            });
            res.redirect(`/dashboard`);
        });
    });
}

function show(req, res) {
    Bill.findById(req.params.id, function(err, bill) {
        if(!req.user._id.equals(bill.user)) res.redirect(`/dashboard`);
        res.render('bills/show', {
            user: req.user,
            bill
        });
    });
}

function update(req, res) {
    Bill.findById(req.params.id, function(err, bill) {
        if(!req.user._id.equals(bill.user)) res.redirect(`/dashboard`);
        bill.name = req.body.name;
        bill.dueDate = req.body.dueDate;
        bill.autoPay = req.body.autoPay;
        bill.autoPayAccount = req.body.autoPayAccount;
        bill.total = req.body.total;
        bill.url = req.body.url;
        bill.save(err => {
            res.redirect(`/dashboard`);
        });
    });
}