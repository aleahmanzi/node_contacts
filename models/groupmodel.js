const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupInfo = new Schema({
  _id :String,
  name: String,
  contacts: [contactInfo._id];
});

const group = mongoose.model('group', groupInfo);

module.exports = group;