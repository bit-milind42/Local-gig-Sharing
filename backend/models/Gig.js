const mongoose = require('mongoose');

const gigSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  gigType: {
    type: String,
    enum: ['Remote', 'On-site'],
    required: true,
  },
  status: {
    type: String,
    enum: ['Active', 'Pending', 'Completed'],
    default: 'Active',
  },
}, {
  timestamps: true,
});

const Gig = mongoose.model('Gig', gigSchema);

module.exports = Gig;