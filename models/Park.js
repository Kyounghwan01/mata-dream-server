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



//잠실 : https://static.wixstatic.com/media/ae6637_b29be20704494f61a435ae778ebf44b8~mv2_d_2405_1472_s_2.jpg/v1/fill/w_960,h_588,al_c,q_85,usm_0.66_1.00_0.01/ae6637_b29be20704494f61a435ae778ebf44b8~mv2_d_2405_1472_s_2.webp