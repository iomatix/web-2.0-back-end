const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  _id: {type: String, required: true},
  username: String,
  password: String,
  accesslevel:   Number //0 User, 1 Admin
});


module.exports = mongoose.model('user', userSchema);