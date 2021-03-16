const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookingSchema = new Schema({
  advisorId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  bookingTime: {
    type: String,
    required: true
  }
  
});

module.exports = mongoose.model('Booking', bookingSchema);
