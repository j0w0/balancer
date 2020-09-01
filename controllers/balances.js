const Balance = require('../models/balance');

module.exports = {
    new: newBalance
}

function newBalance(req, res, next) {
    res.send('respond with a resource');
}