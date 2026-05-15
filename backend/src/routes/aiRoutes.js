const aiController = require('../controllers/aiController');

async function routes(fastify, options) {
  fastify.post('/generate', aiController.generateSession);
}

module.exports = routes;
