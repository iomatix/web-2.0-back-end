var express = require('express');
var router = express.Router();
var getItems = require('../controller/getItems');
var removeItem = require('../controller/removeItem');
const { ensureAuthenticated, forwardAuthenticated } = require('../modules/auth');
/* GET home page. */
router.get('/', ensureAuthenticated, async function(req, res, next) {
  const itemsList =  await getItems();
  res.render('itemRemover', {user:req.user, title: 'Usuń Przedmiot', contents: itemsList});
});


/* Remove Item */
router.post('/remove', async function (req, res, next) {
  const itemName = req.body.valueName;
  let removed = await removeItem(itemName);
  res.render('success-deleted', {name: itemName});

  });
module.exports = router;
