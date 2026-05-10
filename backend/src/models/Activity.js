/* ============================================
   Activity Model — Mongoose schema for itinerary
   activities within a trip.
   ============================================ */

import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema(
  {
    trip: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Trip',
      required: true,
    },
    dayIndex: {
      type: Number,
      required: true,
    },
    timeSlot: {
      type: String,
      enum: ['morning', 'afternoon', 'evening'],
      required: true,
    },
    title: {
      type: String,
      required: [true, 'Activity title is required'],
    },
    description: String,
    location: String,
    category: {
      type: String,
      enum: ['sightseeing', 'food', 'adventure', 'culture', 'shopping', 'transport', 'other'],
      default: 'other',
    },
    estimatedCost: {
      type: Number,
      default: 0,
    },
    duration: {
      type: Number, // in minutes
      default: 60,
    },
    startTime: String,
    endTime: String,
  },
  { timestamps: true }
);

const Activity = mongoose.model('Activity', activitySchema);
export default Activity;
