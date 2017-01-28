const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupInfo = new Schema({
  id :String,
  name: String,
  contacts: [];
});

const group = mongoose.model('group', groupInfo);

module.exports = group;