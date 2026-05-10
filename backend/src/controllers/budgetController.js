/* ============================================
   Budget Controller — Manage trip budgets
   and expenses.
   ============================================ */

import Budget from '../models/Budget.js';

function normalizeExpense(body) {
  return {
    title: body.title || body.description,
    category: body.category || 'Other',
    description: body.description || body.title || '',
    amount: Number(body.amount),
    date: body.date || Date.now(),
    notes: body.notes || '',
  };
}

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
    const budget = await Budget.findOneAndUpdate(
      { trip: req.params.tripId },
      { $setOnInsert: { trip: req.params.tripId } },
      { new: true, upsert: true }
    );
    budget.expenses.push(normalizeExpense(req.body));
    await budget.save();
    res.status(201).json({ success: true, budget });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Update expense
 * @route   PUT /api/budgets/:tripId/expenses/:expenseId
 * @access  Private
 */
export const updateExpense = async (req, res) => {
  try {
    const budget = await Budget.findOne({ trip: req.params.tripId });
    if (!budget) return res.status(404).json({ message: 'Budget not found' });

    const expense = budget.expenses.id(req.params.expenseId);
    if (!expense) return res.status(404).json({ message: 'Expense not found' });

    Object.assign(expense, normalizeExpense({ ...expense.toObject(), ...req.body }));
    await budget.save();
    res.json({ success: true, budget });
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
