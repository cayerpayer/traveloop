/* ============================================
   Server Entry Point — Start Express server
   and connect to MongoDB.
   ============================================ */

import app from './app.js';
import env from './config/env.js';
import connectDB from './config/db.js';

const startServer = async () => {
  // Connect to database
  await connectDB();

  // Start server
  app.listen(env.PORT, () => {
    console.log(`🚀 Traveloop API running on port ${env.PORT} (${env.NODE_ENV})`);
    console.log(`📡 Health check: http://localhost:${env.PORT}/api/health`);
  });
};

startServer();
