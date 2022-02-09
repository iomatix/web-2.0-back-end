var express = require('express');
var router = express.Router();
var db = require('../modules/mongo');
const Item = require('../db_models/item');
const User = require('../db_models/user');
const { ensureAuthenticated, forwardAuthenticated } = require('../modules/auth');

/* GET home page. */
router.get('/API', async function (req, res, next) {
  res.render('API', { title: 'WEB 2.0', error: false });
});

router.get('/API/GetItems', async function (req, res, next) {
  try {
    const item = await db.getItems();
    res.json(item)
  } catch (err) {
    res.status(500).json({message: err.message})
  }
});
router.get('/API/GetItems/:id', async function (req, res, next) {
  try {
    const item = await db.getItem(req.params.id);
    res.json(item)
  } catch (err) {
    res.status(500).json({message: err.message})
  }
});

router.post("/API/CreateItem", async (req, res) => {
  try {
    const it = await db.createItem(req.body.name,req.body.desc,req.body.price);
    console.log("CREATED:",req.body.name,req.body.desc,req.body.price);
    await db.saveItem(it);
    res.send(it);
  } catch (err) {
    res.status(500).json({message: err.message})
  }
})

router.put("/API/CreateItem/:id", async (req, res) => {
  try{
  const it = await db.getItem(req.params.id);
  if(Object.keys(it).length != 0 && Object.getPrototypeOf(it) != Object.prototype){
      it[0].desc = req.body.desc;
      it[0].price = req.body.price;
      console.log("EDITED:",it[0].name,it[0].desc,it[0].price);
      await it[0].save();
      res.send(it[0]);
  }
  else{
  const itThis = await db.createItem(req.body.name,req.body.desc,req.body.price);
  console.log("CREATED:",itThis.name,itThis.desc,itThis.price);
  await db.saveItem(itThis);
  res.send(itThis);
  }
}catch (err) {
  res.status(500).json({message: err.message})
}
});

router.delete("/API/DeleteItem/:id", async (req, res) => {
  try {
    const item = await db.getItem(req.params.id);
    await db.removeItem(req.params.id);
    res.json(item);
  } catch (err) {
    res.status(500).json({message: err.message})
  }
});
module.exports = router;
