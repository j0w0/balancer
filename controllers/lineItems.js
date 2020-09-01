const Balance = require('../models/balance');
const LineItem = require('../models/lineItem');

module.exports = {
    new: newItem
}

function newItem(req, res) {
    res.send('respond with a resource');
}