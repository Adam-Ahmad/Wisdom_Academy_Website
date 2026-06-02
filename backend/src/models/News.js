const mongoose = require('mongoose');

module.exports = mongoose.model('News', new mongoose.Schema({
  title: { type: String, required: true, index: true },
  slug: { type: String, required: true, unique: true, lowercase: true },
  excerpt: String,
  content: { type: String, required: true },
  featuredImage: String,
  category: { type: String, enum: ['match', 'announcement', 'academy', 'press'] },
  status: { type: String, enum: ['draft', 'published', 'archived'], default: 'draft', index: true },
  publishDate: Date
}, { timestamps: true }));