const Session = require('../models/Session');

exports.getSessions = async (req, reply) => {
  try {
    const { focusArea } = req.query;
    const query = focusArea ? { focusArea: { $regex: new RegExp(focusArea, 'i') } } : {};
    const sessions = await Session.find(query).populate('exercises.exerciseId');
    return sessions;
  } catch (err) {
    reply.status(500).send({ error: 'Server Error', message: err.message });
  }
};

exports.getSessionById = async (req, reply) => {
  try {
    const session = await Session.findById(req.params.id).populate('exercises.exerciseId');
    if (!session) return reply.status(404).send({ error: 'Session not found' });
    return session;
  } catch (err) {
    reply.status(500).send({ error: 'Server Error', message: err.message });
  }
};

exports.createSession = async (req, reply) => {
  try {
    const newSession = new Session(req.body);
    const savedSession = await newSession.save();
    reply.status(201).send(savedSession);
  } catch (err) {
    reply.status(400).send({ error: 'Bad Request', message: err.message });
  }
};
