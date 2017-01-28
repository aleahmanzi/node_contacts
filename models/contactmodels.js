const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactInfo = new Schema({
  id: String,
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


const contact = mongoose.model('contact', contactInfo);

module.exports = contact;
