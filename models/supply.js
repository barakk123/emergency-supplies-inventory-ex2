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
    type: mongoose.Types.Decimal128,
    required: true,
    min: [0, 'Quantity cannot be negative.']
  },
  quantity: {
    type: Number,
    required: true,
    min: [0, 'Quantity cannot be negative.']
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
});

const Supply = mongoose.model('Supply', supplySchema);

module.exports = Supply;
