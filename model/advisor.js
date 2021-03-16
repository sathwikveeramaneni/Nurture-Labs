const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const advisorSchema = new Schema({
  advisorName: {
    type: String,
    required: true
  },
  photoUrl: {
    type: String,
    required: true
  }
  
});

module.exports = mongoose.model('Advisor', advisorSchema);
