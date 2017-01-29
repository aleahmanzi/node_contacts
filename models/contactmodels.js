const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactInfo = new Schema({
  _id: String,
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
  groups: [groupInfo._id],
  pictures: [],
  address: [addressInfo._id],
  spouce: [countactInfo._id],
  lastContact: [{
    type: String,
    date: {type: Date},
    photos: []
  }],
});


const contact = mongoose.model('contact', contactInfo);

module.exports = contact;
