const mongoose = require('mongoose');

const RecordSchema = new mongoose.Schema({
  streetAddress: String,       
  apartmentNumber: String,     
  zipCode: String,            
  district: String,
  firstName:String,
  lastName:String,
  phone: String,             
  email: String,
  ticket:Boolean     
});

module.exports = mongoose.model('District', RecordSchema, 'district');


