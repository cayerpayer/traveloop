import { useCallback, useEffect, useMemo, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useAuth } from '../context/AuthContext';
import { useTrips } from '../context/TripContext';
import { getItem, setItem } from '../utils/localStorage';

const STORAGE_KEY = 'traveloop_budget_expenses';

export const EXPENSE_CATEGORIES = [
  { value: 'Food', icon: 'bi-cup-hot', color: '#F59E0B' },
  { value: 'Flight', icon: 'bi-airplane', color: '#4F46E5' },
  { value: 'Hotel', icon: 'bi-building', color: '#06B6D4' },
  { value: 'Transport', icon: 'bi-bus-front', color: '#8B5CF6' },
  { value: 'Shopping', icon: 'bi-bag', color: '#EC4899' },
  { value: 'Activities', icon: 'bi-lightning-charge', color: '#10B981' },
  { value: 'Other', icon: 'bi-three-dots', color: '#94A3B8' },
];

function getStorageKey(userId) {
  return userId ? `${STORAGE_KEY}_${userId}` : null;
}

function normalizeExpense(expense) {
  return {
    id: expense.id || uuidv4(),
    title: String(expense.title || expense.description || '').trim(),
    category: expense.category || 'Other',
    amount: Number(expense.amount) || 0,
    date: expense.date || new Date().toISOString().slice(0, 10),
    notes: String(expense.notes || '').trim(),
    tripId: expense.tripId || 'general',
    createdAt: expense.createdAt || new Date().toISOString(),
    updatedAt: expense.updatedAt || new Date().toISOString(),
  };
}

export default function useBudgetExpenses() {
  const { user, loading: authLoading } = useAuth();
  const { trips, loading: tripsLoading } = useTrips();
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const storageKey = getStorageKey(user?.id);

  useEffect(() => {
    if (authLoading || tripsLoading) return;
    // localStorage is the app's current user-scoped data store, so this effect hydrates state when the active user changes.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true);
    setExpenses((getItem(storageKey, []) || []).map(normalizeExpense));
    setLoading(false);
  }, [authLoading, tripsLoading, storageKey]);

  useEffect(() => {
    if (!storageKey || loading) return;
    setItem(storageKey, expenses);
  }, [expenses, loading, storageKey]);

  const tripOptions = useMemo(() => (
    trips.map((trip) => ({
      id: trip.id,
      label: trip.tripName || trip.title || 'Untitled Trip',
    }))
  ), [trips]);

  const addExpense = useCallback((expenseData) => {
    const expense = normalizeExpense(expenseData);
    setExpenses((prev) => [expense, ...prev]);
    return expense;
  }, []);

  const updateExpense = useCallback((expenseId, updates) => {
    const updatedAt = new Date().toISOString();
    setExpenses((prev) => prev.map((expense) => (
      expense.id === expenseId ? normalizeExpense({ ...expense, ...updates, id: expense.id, createdAt: expense.createdAt, updatedAt }) : expense
    )));
  }, []);

  const deleteExpense = useCallback((expenseId) => {
    setExpenses((prev) => prev.filter((expense) => expense.id !== expenseId));
  }, []);

  return {
    expenses,
    loading,
    tripOptions,
    addExpense,
    updateExpense,
    deleteExpense,
  };
}
