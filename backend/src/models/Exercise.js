const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  focusArea: { type: String, required: true }, // e.g., 'Full Body', 'Chest', 'Legs', 'Skinny Arms'
  mediaUrl: { type: String, default: '' }, // Cloudinary Video/GIF URL
  audioUrl: { type: String, default: '' }, // Cloudinary Audio URL
  defaultReps: { type: Number, default: 10 },
  defaultSets: { type: Number, default: 3 },
  durationSeconds: { type: Number, default: 30 }, // useful for timed exercises
  isTimeBased: { type: Boolean, default: false },
}, {
  timestamps: true
});

module.exports = mongoose.model('Exercise', exerciseSchema);
