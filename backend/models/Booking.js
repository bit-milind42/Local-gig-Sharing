const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  gig: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Gig',
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'pending',
  },
  bookedAt: {
    type: Date,
    default: Date.now,
  },
});

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;
