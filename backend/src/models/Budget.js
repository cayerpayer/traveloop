/* ============================================
   Budget Model — Mongoose schema for trip
   budget and expense tracking.
   ============================================ */

import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema({
  category: {
    type: String,
    enum: ['accommodation', 'food', 'transport', 'activities', 'shopping', 'other'],
    required: true,
  },
  description: String,
  amount: {
    type: Number,
    required: [true, 'Amount is required'],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const budgetSchema = new mongoose.Schema(
  {
    trip: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Trip',
      required: true,
      unique: true,
    },
    totalBudget: {
      type: Number,
      default: 0,
    },
    currency: {
      type: String,
      default: 'USD',
    },
    expenses: [expenseSchema],
  },
  { timestamps: true }
);

// Virtual: total spent
budgetSchema.virtual('totalSpent').get(function () {
  return this.expenses.reduce((sum, exp) => sum + exp.amount, 0);
});

// Virtual: remaining
budgetSchema.virtual('remaining').get(function () {
  return this.totalBudget - this.totalSpent;
});

budgetSchema.set('toJSON', { virtuals: true });

const Budget = mongoose.model('Budget', budgetSchema);
export default Budget;
