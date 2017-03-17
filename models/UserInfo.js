const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userInfo = new Schema({
  name: {
    firstName: String,
    lastName: String
  },
  email: String,
  picture: String,
  coordinates: {
    locLat: String,
    locLong: String
  },
  contacts: [{type: mongoose.Schema.Types.ObjectId, ref: 'addressInfo'}, {type: mongoose.Schema.Types.ObjectId, ref: 'contactInfo'}, {type: mongoose.Schema.Types.ObjectId, ref: 'groupInfo'}]
});

userInfo.methods.apiRepr = function() {
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


mongoose.model('userInfo', userInfo);
