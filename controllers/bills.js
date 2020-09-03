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

        const budgetId = budget.id;
        req.body.budget = budgetId;
        req.body.user = req.user.id;

        // create new bill to budget (parent)
        const newBill = new Bill(req.body);

        newBill.save(err => {

            // add new bill
            budget.bills.push(newBill.id);

            budget.save(err => {
                if(err) res.render('bills/new', {
                    user: req.user,
                    budgetId
                });
                res.redirect(`/dashboard`);
            });
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
    }).populate('budget');
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