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
    Budget.findById(req.params.id, (err, budget) => {
        if(!budget || !budget.user.equals(req.user._id) || err) return res.redirect(`/`);

        res.render('bills/new', {
            budgetId: req.params.id
        });
    });
}

function create(req, res) {
    Budget.findById(req.params.id, function(err, budget) {
        if(!budget || !budget.user.equals(req.user._id) || err) return res.redirect(`/`);

        const budgetId = budget.id;
        req.body.budget = budgetId;
        req.body.user = req.user.id;

        // create new bill to budget (parent)
        const newBill = new Bill(req.body);

        newBill.save(err => {

            // add new bill
            budget.bills.push(newBill.id);

            budget.save(err => {
                if(err) res.render('bills/new', { budgetId });
                res.redirect(`/dashboard`);
            });
        });
    });
}

function show(req, res) {
    Bill.findById(req.params.id, function(err, bill) {
        if(!bill || !bill.user.equals(req.user._id) || err) return res.redirect(`/`);
        res.render('bills/show', { bill });
    }).populate('budget');
}

function update(req, res) {
    Bill.findById(req.params.id, function(err, bill) {
        if(!bill || !bill.user.equals(req.user._id) || err) return res.redirect(`/`);

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