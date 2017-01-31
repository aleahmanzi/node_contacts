const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
  phone: String,
  contact: [{type: mongoose.Schema.Types.ObjectId, ref: 'contactInfo'}]
});

addressInfo.methods.apiRepr = function() {
  return {
    id: this._id,
    street1: this.street1,
    street2: this.street2,
    city: this.city,
    state: this.state,
    zip: this.zip,
    country: this.country,
    coordinates: this.coordinates,
    phone: this.phone,
    contact: this.contact
  };
};

mongoose.model('addressInfo', addressInfo);
