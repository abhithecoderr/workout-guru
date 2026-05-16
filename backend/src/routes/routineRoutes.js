const routineController = require('../controllers/routineController');

async function routineRoutes(fastify, options) {
  fastify.get('/', routineController.getRoutinesByFocusArea);
  fastify.get('/:id', routineController.getRoutineById);
}

module.exports = routineRoutes;
