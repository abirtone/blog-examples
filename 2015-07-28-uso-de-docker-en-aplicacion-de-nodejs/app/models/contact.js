var mongoose = require('mongoose');

var Schema = mongoose.Schema

var ContactSchema = new Schema({
  firstName: String,
  lastName: String,
  favourite: Boolean,
  bornDate: Date,
  phone: String,
  email: String,
  creationdDate: {type:Date, default:Date.now}
});


module.exports = mongoose.model('Contact',ContactSchema);
