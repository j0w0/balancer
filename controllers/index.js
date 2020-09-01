const User = require('../models/user');
const Category = require('../models/category');
const Budget = require('../models/budget');
const Bill = require('../models/bill');
const Balance = require('../models/balance');
const LineItem = require('../models/lineItem');

module.exports = {
    index,
    dashboard
}

function index(req, res) {    
    if(req.user) return res.redirect('/dashboard');
    res.render('index', {
        user: req.user
    });
}

function dashboard(req, res) {
    Budget.find({ user: req.user._id }, function(err, budgets) {
        res.render('dashboard', {
            user: req.user,
            budgets
        });
    });
}