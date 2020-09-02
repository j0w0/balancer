const Budget = require('../models/budget');
const Bill = require('../models/bill');

module.exports = {
    index,
    new: newBudget,
    create,
    show,
    update
}

function index(req, res) {
    res.redirect('/');
}

function newBudget(req, res) {
    res.render('budgets/new', {
        user: req.user
    });
}

function create(req, res) {
    if(req.body.name === '') delete req.body.name;
    req.body.user = req.user.id;
    Budget.create(req.body, err => {
        res.redirect('/dashboard');
    });
}

function show(req, res) {
    Budget.findById(req.params.id, function(err, budget) {
        if(!budget) res.redirect('/dashboard');
        if(!req.user._id.equals(budget.user)) res.redirect(`/dashboard`);
        Bill.find({}, (err, bills) => {
            res.render('budgets/show', {
                user: req.user,
                budget,
                bills
            });
        })
    });
}

function update(req, res) {
    Budget.findById(req.params.id, function(err, budget) {
        if(!req.user._id.equals(budget.user)) res.redirect(`/dashboard`);
        req.body.name === '' ? delete req.body.name : budget.name = req.body.name;
        budget.paySchedule = req.body.paySchedule;
        budget.save(err => {
            res.redirect(`/dashboard`);
        });
    });
}