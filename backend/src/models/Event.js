const mongoose = require('mongoose');

module.exports = mongoose.model('Event', new mongoose.Schema({
  title: { type: String, required: true, index: true },
  description: String,
  date: { type: Date, required: true, index: true },
  location: String,
  type: { type: String, enum: ['tournament', 'training', 'camp', 'social'], default: 'training' },
  isPublic: { type: Boolean, default: true }
}, { timestamps: true }));