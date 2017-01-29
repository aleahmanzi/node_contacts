const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userInfo = new Schema({
  _id: String,
  name: {
    firstName: String,
    lastName: String
  }
  username: String,
  password: String,
  email: String,
  picture: String,
  coordinates: {
    locLat: String,
    locLong: String
  }
});

const user = mongoose.model('user', userInfo);

module.exports = user;