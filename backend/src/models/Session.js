const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  focusArea: { type: String, required: true }, // e.g., 'Full Body'
  isAiGenerated: { type: Boolean, default: false },
  exercises: [
    {
      exerciseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Exercise', required: true },
      adjustedReps: { type: Number }, // Overrides the default exercise reps if needed
      adjustedSets: { type: Number },
      adjustedDuration: { type: Number }
    }
  ]
}, {
  timestamps: true
});

module.exports = mongoose.model('Session', sessionSchema);
