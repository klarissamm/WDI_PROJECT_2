const mongoose  = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  name: { type: String },
  cuisine: { type: String },
  address: { type: String },
  lat: { type: Number },
  lng: { type: Number }
});

module.exports = mongoose.model('Restaurant', restaurantSchema);
