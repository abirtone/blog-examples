var mongoose = require('mongoose');
var Contact = require('./contact');
var Schema = mongoose.Schema;



var AgendaSchema = new Schema({
  title: String,
  description: String,
  creationdDate: {type:Date, default:Date.now},
  contacts: [Contact.schema]
});

module.exports = mongoose.model('Agenda',AgendaSchema);
