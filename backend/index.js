require('dotenv').config();
const fastify = require('fastify')({ logger: true });
const cors = require('@fastify/cors');
const connectDB = require('./src/config/db');
const exerciseRoutes = require('./src/routes/exerciseRoutes');
const sessionRoutes = require('./src/routes/sessionRoutes');
const aiRoutes = require('./src/routes/aiRoutes');
const routineRoutes = require('./src/routes/routineRoutes');

fastify.register(cors, {
  origin: '*'
});

// Register routes
fastify.register(exerciseRoutes, { prefix: '/api/exercises' });
fastify.register(sessionRoutes, { prefix: '/api/sessions' });
fastify.register(aiRoutes, { prefix: '/api/ai' });
fastify.register(routineRoutes, { prefix: '/api/routines' });

// Start server
const start = async () => {
  try {
    await connectDB();
    await fastify.listen({ port: process.env.PORT || 5000, host: '0.0.0.0' });
    fastify.log.info(`Server listening on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
