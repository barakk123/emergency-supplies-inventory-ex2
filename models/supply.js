const mongoose = require('mongoose');
const supplySchema = new mongoose.Schema({
  supply_name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  unit_price: {
    type: Number,
    required: true,
    min: [0, 'Quantity cannot be negative or string.']
  },
  quantity: {
    type: Number,
    required: true,
    min: [0, 'Quantity cannot be negative or string.']
  },
  expiration_date: {
    type: Date,
    default: null,
  },
  supplier: {
    type: String,
    required: true,
    trim: true,
  },
  location: {
    type: String,
    required: true,
    trim: true,
  }
},{ versionKey: false });

const Supply = mongoose.model('Supply', supplySchema);

module.exports = Supply;
