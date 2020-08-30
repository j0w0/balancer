var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // window.open("https://www.google.com")
  res.render('index', { title: 'Express' });
});

module.exports = router;
