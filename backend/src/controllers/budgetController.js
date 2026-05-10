/* ============================================
   Budget Controller — Manage trip budgets
   and expenses.
   ============================================ */

import Budget from '../models/Budget.js';

/**
 * @desc    Get budget for a trip
 * @route   GET /api/budgets/:tripId
 * @access  Private
 */
export const getBudget = async (req, res) => {
  try {
    let budget = await Budget.findOne({ trip: req.params.tripId });
    if (!budget) {
      budget = await Budget.create({ trip: req.params.tripId });
    }
    res.json({ success: true, budget });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Update budget
 * @route   PUT /api/budgets/:tripId
 * @access  Private
 */
export const updateBudget = async (req, res) => {
  try {
    const budget = await Budget.findOneAndUpdate(
      { trip: req.params.tripId },
      req.body,
      { new: true, runValidators: true, upsert: true }
    );
    res.json({ success: true, budget });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Add expense
 * @route   POST /api/budgets/:tripId/expenses
 * @access  Private
 */
export const addExpense = async (req, res) => {
  try {
    const budget = await Budget.findOne({ trip: req.params.tripId });
    if (!budget) return res.status(404).json({ message: 'Budget not found' });
    budget.expenses.push(req.body);
    await budget.save();
    res.status(201).json({ success: true, budget });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Delete expense
 * @route   DELETE /api/budgets/:tripId/expenses/:expenseId
 * @access  Private
 */
export const deleteExpense = async (req, res) => {
  try {
    const budget = await Budget.findOne({ trip: req.params.tripId });
    if (!budget) return res.status(404).json({ message: 'Budget not found' });
    budget.expenses = budget.expenses.filter((e) => e._id.toString() !== req.params.expenseId);
    await budget.save();
    res.json({ success: true, budget });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
