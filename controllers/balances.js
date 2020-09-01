const Balance = require('../models/balance');
const LineItem = require('../models/lineItem');

module.exports = {
    new: newBalance
}

function newBalance(req, res, next) {
    res.send('respond with a resource');
}