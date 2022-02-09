const LocalStrategy = require('passport-local').Strategy;
const db = require('./mongo');
const User = require('../db_models/user');



module.exports = async function(passport) {
  passport.use(
    new LocalStrategy({ usernameField: 'username', passwordField: 'password' }, async (username, password, done) => {
        
        const it = await db.getUser(username);
        if (Object.keys(it).length === 0 || Object.getPrototypeOf(it) === Object.prototype) {
            
            return done(null, false, { message: 'Podany adres e-mail jest niezarejestrowany lub niepotwierdzony.' });
        }
        
         
          if (password === it[0].password) {
            return done(null, it);
          } else {
            return done(null, false, { message: 'Podane hasło jest nieprawidłowe.' });
          }
      
    
    })
  );

  passport.serializeUser(function(user, done) {
    console.log(user[0]);
    done(null, user[0]);
  });
  
  passport.deserializeUser(function(_id , done) {
    User.findOne(_id , function (err, user) {
      done(err, user);
    });
  });
};