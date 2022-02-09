var db = require('../modules/mongo');
var register =async function(username,password,password2,errors){
    if (!username || !password || !password2) {
        errors.push({ msg: 'Należy wypełnić wszystkie pola...' });
      }
    
      if (password != password2) {
        errors.push({ msg: 'Hasła nie pokrywają się...' });
      }
    
      if (password.length < 4) {
        errors.push({ msg: 'Hasło musi się składać z przynajmniej 5 znaków...' });
      }
  
      if (errors.length > 0) {
        return false;
      } else {

          const it = await db.getUser(username);
          if (Object.keys(it).length != 0 && Object.getPrototypeOf(it) != Object.prototype) {
            errors.push({ msg: 'Ten adres e-mail jest zajęty...' });
            return false;
          } else {
            const newUser = db.createUser(username,password,0);
            await  db.saveItem(newUser);

                    return true;
                    
                  }
           }
        }
    module.exports=register;