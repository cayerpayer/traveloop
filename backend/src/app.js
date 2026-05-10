/* ============================================
   Express App — Middleware and route setup.
   ============================================ */

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import env from './config/env.js';

// Route imports
import authRoutes from './routes/authRoutes.js';
import tripRoutes from './routes/tripRoutes.js';
import itineraryRoutes from './routes/itineraryRoutes.js';
import budgetRoutes from './routes/budgetRoutes.js';
import profileRoutes from './routes/profileRoutes.js';
import notesRoutes from './routes/notesRoutes.js';

// Middleware imports
import { errorHandler, notFound } from './middleware/errorMiddleware.js';

const app = express();

// ── Core Middleware ──
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

if (env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// ── Health Check ──
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Traveloop API',
    timestamp: new Date().toISOString(),
  });
});

// ── API Routes ──
app.use('/api/auth', authRoutes);
app.use('/api/trips', tripRoutes);
app.use('/api/itineraries', itineraryRoutes);
app.use('/api/budgets', budgetRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/notes', notesRoutes);

// ── Error Handling ──
app.use(notFound);
app.use(errorHandler);

export default app;
