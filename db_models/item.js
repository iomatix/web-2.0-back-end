const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  _id: {type: String, required: true},
  name:  String,
  desc: String,
  price:   Number
});


module.exports = mongoose.model('item', itemSchema);