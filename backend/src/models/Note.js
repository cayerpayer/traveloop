/* ============================================
   Note Model — Mongoose schema for travel
   journal entries and notes.
   ============================================ */

import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    trip: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Trip',
    },
    title: {
      type: String,
      required: [true, 'Note title is required'],
      trim: true,
    },
    content: {
      type: String,
      default: '',
    },
    mood: {
      type: String,
      enum: ['excited', 'happy', 'neutral', 'tired', 'sad'],
      default: 'neutral',
    },
    category: {
      type: String,
      enum: ['general', 'tips', 'food', 'culture', 'adventure', 'budget'],
      default: 'general',
    },
    city: String,
    tags: [String],
    isPinned: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Note = mongoose.model('Note', noteSchema);
export default Note;
