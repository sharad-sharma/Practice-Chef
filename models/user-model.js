const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  fullname: String,
  access_token: String,
  refresh_token: String,
  current_rating: Number,
  first_loggedin_rating: Number
});

const User = mongoose.model('users', userSchema);

module.exports = User;