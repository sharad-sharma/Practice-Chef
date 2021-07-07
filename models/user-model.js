const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  fullname: String,
  access_token: String,
  refresh_token: String,
});

const User = mongoose.model('users', userSchema);

module.exports = User;