const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupInfo = new Schema({
  name: String,
  contacts: [{type: mongoose.Schema.Types.ObjectId, ref: 'contactInfo'}]
});

groupInfo.methods.apiRepr = function() {
  return {
    id: this._id,
    name: this.name,
    contacts: this.contacts
  };
};


mongoose.model('groupInfo', groupInfo);
