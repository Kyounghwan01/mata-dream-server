const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ParkSchema = new Schema({
  name: {
    type: String,
    require: true
  },
  location: {
    latitude: {
      type: Number,
      required: true
    },
    longitude: {
      type: Number,
      required: true
    }
  },
  address: { type: String, required: true }
});

module.exports = mongoose.model('Park', ParkSchema);
