const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactInfo = new Schema({
  name: {
  	firstName: String,
  	lastName: String
  },
  birthday: {
  	source: String,
  	date: {type: Date},
  	age: String
  },
  phoneNumber: {
    mobile: String,
    work: String,
    other: String
  },
  email: {
    personal: String,
    work: String 
  },
  company: String,
  groups: [],
  pictures: [],
  address: [object.id.address],
  spouce: [countactInfo.id],
  lastContact: [{
    type: String,
    date: {type: Date}
  }],
});

const addressInfo = new Schema({
  street1: String,
  street2: String,
  city: String,
  state: String,
  zip: String,
  country: String,
  coordinates: {
    locLat: String,
    locLong: String
  },
  phone: String
});

const groupInfo = new Schema({
  name: String,
  contacts: [];
});

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
  }
})