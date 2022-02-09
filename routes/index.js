var express = require('express');
var router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../modules/auth');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {user: req.user, title: 'WEB 2.0', error: false });
});

module.exports = router;
