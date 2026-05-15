const exerciseController = require('../controllers/exerciseController');

async function routes(fastify, options) {
  fastify.get('/', exerciseController.getExercises);
  fastify.get('/:id', exerciseController.getExerciseById);
  fastify.post('/', exerciseController.createExercise);
}

module.exports = routes;
