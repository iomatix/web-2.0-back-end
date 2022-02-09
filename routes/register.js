var express = require('express');
var router = express.Router();
const { forwardAuthenticated } = require('../modules/auth');


router.get('/', forwardAuthenticated, (req, res) => res.render('register', {title: "Panel Rejestracji"}));

module.exports = router;
