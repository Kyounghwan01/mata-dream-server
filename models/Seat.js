const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const seatSchema = new Schema({
  seller: {
    type: Schema.Types.ObjectId,
    required: true
  },
  complete: {
    type: Boolean,
    default: false
  },
  point: {
    type: Number,
    required: true
  },
  image_url : {
    type: String,
    required: true
  },
  location: {
    latitude: {
      type: String,
      required: true
    },
    longitude: {
      type: String,
      required: true
    }
  },
  park: {
    type: Schema.Types.ObjectId,
    ref: 'Park'
  }
});

module.exports = mongoose.model('Seat', seatSchema);
