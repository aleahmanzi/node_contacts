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
  groups: [{type: mongoose.Schema.Types.ObjectId, ref: 'groupInfo'}],
  pictures: {type : Array , "default" : []},
  address: [{type: mongoose.Schema.Types.ObjectId, ref: 'addressInfo'}],
  spouse: {
    name: String,
    _id: String
  },
  connections: [{
    type: String,
    date: {type: Date},
    photos: []
  }],
  userId: String
});

contactInfo.methods.apiRepr = function() {
  return {
    id: this._id,
    name: this.name,
    birthday: this.birthday,
    phoneNumber: this.phoneNumber,
    email: this.email,
    company: this.company,
    groups: this.groups,
    pictures: this.pictures,
    address: this.address,
    spouse: this.spouse,
    connections: this.connections
  };
};


mongoose.model('contactInfo', contactInfo);
