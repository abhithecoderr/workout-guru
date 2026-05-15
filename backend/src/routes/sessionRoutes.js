const sessionController = require('../controllers/sessionController');

async function routes(fastify, options) {
  fastify.get('/', sessionController.getSessions);
  fastify.get('/:id', sessionController.getSessionById);
  fastify.post('/', sessionController.createSession);
}

module.exports = routes;
