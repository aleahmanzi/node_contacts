const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userInfo = new Schema({
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
  },
  contacts: [addressInfo, contactInfo, groupInfo]
});

contactInfo.methods.apiRepr = function() {
  return {
    id: this._id,
    name: this.name,
    username: this.username,
    password: this.password,
    email: this.email,
    picture: this.picture,
    coordinates: this.coordinates,
    contacts: this.contacts
  };
};


const user = mongoose.model('user', userInfo);

module.exports = user;