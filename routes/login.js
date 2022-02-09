var express = require('express');
var router = express.Router();
const { ensureAuthenticated,forwardAuthenticated } = require('../modules/auth');

router.get('/', forwardAuthenticated, (req, res) => res.render('login', {title: "Panel Logowania"}));

router.get('/success',ensureAuthenticated, function(req, res, next) {
  res.render('users', {username: req.user.username, title: 'Zalogowano do serwisu WEB 2.0', error: false });
});

module.exports = router;
