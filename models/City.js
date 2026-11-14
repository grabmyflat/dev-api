const mongoose = require('mongoose');

const CitySchema = new mongoose.Schema({
  cityCode: String,

  cityName: String,

  stateName: String,

  isActive: {
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model('City', CitySchema);