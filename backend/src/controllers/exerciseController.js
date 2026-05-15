const Exercise = require('../models/Exercise');

exports.getExercises = async (req, reply) => {
  try {
    const { focusArea } = req.query;
    const query = focusArea ? { focusArea } : {};
    const exercises = await Exercise.find(query);
    return exercises;
  } catch (err) {
    reply.status(500).send({ error: 'Server Error', message: err.message });
  }
};

exports.getExerciseById = async (req, reply) => {
  try {
    const exercise = await Exercise.findById(req.params.id);
    if (!exercise) return reply.status(404).send({ error: 'Exercise not found' });
    return exercise;
  } catch (err) {
    reply.status(500).send({ error: 'Server Error', message: err.message });
  }
};

exports.createExercise = async (req, reply) => {
  try {
    const newExercise = new Exercise(req.body);
    const savedExercise = await newExercise.save();
    reply.status(201).send(savedExercise);
  } catch (err) {
    reply.status(400).send({ error: 'Bad Request', message: err.message });
  }
};
