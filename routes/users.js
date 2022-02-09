var express = require('express');
var router = express.Router();
var register = require('../controller/register');
const passport = require('passport');

/* GET users listing. */
router.get('/', function (req, res, next) {
    //res.send('Nie powinieneś się tutaj znaleźć...');
    res.redirect('/');
});

/* Login user */
router.post('/login', async function (req, res, next) {
    passport.authenticate('local', {
        successRedirect: '/users/login/success',
        failureRedirect: '/users/login',
        failureFlash: true
      })(req, res, next);
});


/* Register user */
router.post('/register', async (req, res) => {
    const { username, password, password2 } = req.body;
    let errors = [];
    let registerResult = await register(username,password,password2,errors);
    if(registerResult){
        req.flash(
            'success_msg',
            'Konto zarejestrowane. Zaloguj się!'
          );
        res.redirect('/users/login');
    }else{
        res.render('register', {
            errors,
            username,
            password,
            password2,
            error: true
          });
    }
      });
    
module.exports = router;

