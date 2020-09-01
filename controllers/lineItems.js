const Balance = require('../models/balance');

module.exports = {
    new: newItem
}

function newItem(req, res) {
    res.send('respond with a resource');
}