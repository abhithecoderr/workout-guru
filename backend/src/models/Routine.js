const mongoose = require('mongoose');

const routineSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  focusArea: { type: String, required: true }, // e.g., 'Full Body', 'Upper Body'
  isPremade: { type: Boolean, default: true },
  exercises: [
    {
      exerciseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Exercise', required: true },
      defaultReps: { type: Number }, // Inherited or set for this routine
      defaultSets: { type: Number },
      durationSeconds: { type: Number }
    }
  ]
}, {
  timestamps: true
});

module.exports = mongoose.model('Routine', routineSchema);
