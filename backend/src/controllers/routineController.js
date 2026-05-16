const Routine = require('../models/Routine');

exports.getRoutinesByFocusArea = async (req, reply) => {
  try {
    const { area } = req.query;
    let query = { isPremade: true };
    if (area) {
      query.focusArea = area;
    }
    const routines = await Routine.find(query).populate('exercises.exerciseId');
    return reply.status(200).send(routines);
  } catch (err) {
    reply.status(500).send({ error: 'Failed to fetch routines' });
  }
};

exports.getRoutineById = async (req, reply) => {
  try {
    const routine = await Routine.findById(req.params.id).populate('exercises.exerciseId');
    if (!routine) return reply.status(404).send({ error: 'Routine not found' });
    return reply.status(200).send(routine);
  } catch (err) {
    reply.status(500).send({ error: 'Failed to fetch routine' });
  }
};
