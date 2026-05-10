/* ============================================
   Trip Model — Mongoose schema for travel trips.
   ============================================ */

import mongoose from 'mongoose';

const tripSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: [true, 'Trip title is required'],
      trim: true,
    },
    destination: {
      type: String,
      required: [true, 'Destination is required'],
    },
    startDate: {
      type: Date,
      required: [true, 'Start date is required'],
    },
    endDate: {
      type: Date,
      required: [true, 'End date is required'],
    },
    budget: {
      total: { type: Number, default: 0 },
      currency: { type: String, default: 'USD' },
    },
    travelers: {
      type: Number,
      default: 1,
    },
    status: {
      type: String,
      enum: ['planning', 'active', 'completed', 'cancelled'],
      default: 'planning',
    },
    coverImage: {
      type: String,
      default: '',
    },
    notes: {
      type: String,
      default: '',
    },
    tags: [String],
  },
  { timestamps: true }
);

const Trip = mongoose.model('Trip', tripSchema);
export default Trip;
