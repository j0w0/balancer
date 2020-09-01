const Budget = require('../models/budget');

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
    Budget.findById(req.params.id, function(err, budget) {
        budget.bills.push(req.body);
        budget.save(err => {
            if(err) res.render('bills/new', {
                user: req.user,
                budgetId: req.params.id
            });
            res.redirect(`/budgets/${req.params.id}`);
        });
    });
}

function show(req, res) {
    Budget.findOne({'bills._id': req.params.id}, function(err, budget) {
        const bill = budget.bills.find(bill => bill._id = req.params.id);
        res.render('bills/show', {
            user: req.user,
            bill
        });
    });
}

function update(req, res) {
    Budget.findOne({'bills._id': req.params.id}, function(err, budget) {
        const billIdx = budget.bills.findIndex(bill => bill._id = req.params.id);
        
        req.body._id = req.params.id;
        budget.bills[billIdx] = req.body;

        budget.save(err => {
            res.redirect(`/budgets/${budget.id}`);
        });
    });
}