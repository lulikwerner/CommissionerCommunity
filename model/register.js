// models/register.js
const mongoose = require('mongoose');

const registerSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  streetAddress: String,
  apartmentNumber: String,
  ticket: Boolean,
  districtId: { type: mongoose.Schema.Types.ObjectId, ref: 'District' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Register', registerSchema);
