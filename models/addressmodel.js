const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const addressInfo = new Schema({
  _id: String,
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
  phone: String,
  contact: [contactInfo._id]
});

const address = mongoose.model('address', addressInfo);

module.exports = address;