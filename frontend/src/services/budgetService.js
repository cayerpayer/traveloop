/* ============================================
   Budget Service — API calls for budget
   tracking and expense management.
   Currently uses localStorage.
   Ready for backend integration.
   ============================================ */

import api from './api';

/**
 * Get budget for a trip.
 */
export const getBudget = async (tripId) => {
  const response = await api.get(`/budgets/${tripId}`);
  return response.data;
};

/**
 * Update budget for a trip.
 */
export const updateBudget = async (tripId, budgetData) => {
  const response = await api.put(`/budgets/${tripId}`, budgetData);
  return response.data;
};

/**
 * Add expense to budget.
 */
export const addExpense = async (tripId, expense) => {
  const response = await api.post(`/budgets/${tripId}/expenses`, expense);
  return response.data;
};

/**
 * Delete expense from budget.
 */
export const deleteExpense = async (tripId, expenseId) => {
  const response = await api.delete(`/budgets/${tripId}/expenses/${expenseId}`);
  return response.data;
};

/**
 * Get budget analytics/summary.
 */
export const getBudgetAnalytics = async (tripId) => {
  const response = await api.get(`/budgets/${tripId}/analytics`);
  return response.data;
};
