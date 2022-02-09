var express = require('express');
var router = express.Router();
var createItem = require('../controller/createItem');
const { ensureAuthenticated, forwardAuthenticated } = require('../modules/auth');
/* GET home page. */
router.get('/', ensureAuthenticated, function(req, res, next) {
  res.render('itemAdd', {user:req.user, title: 'Dodaj lub Edytuj Przedmiot' });
});


/* Create new Item */
router.post('/add_item', function (req, res, next) { //name desc price
  const tName = req.body.name;
  const tDesc = req.body.desc;
  const tPass = req.body.price;
  let creationResult = createItem(tName, tDesc, tPass);
  if (creationResult) {
          res.render('success', {name: tName, desc: tDesc, price: tPass});
      }
  });

module.exports = router;
