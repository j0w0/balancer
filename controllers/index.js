const User = require('../models/user');

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
    res.render('dashboard', {
        user: req.user
    });
}