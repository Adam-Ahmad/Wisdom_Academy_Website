const mongoose = require('mongoose');

module.exports = mongoose.model('Registration', new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  dob: { type: Date, required: true },
  ageGroup: { type: String, required: true, index: true }, // e.g., U12, U15, Senior
  parentName: String,
  parentEmail: { type: String, required: true, trim: true, lowercase: true },
  phone: String,
  medicalNotes: String,
  status: { type: String, enum: ['pending', 'approved', 'rejected', 'waitlisted'], default: 'pending', index: true }
}, { timestamps: true }));