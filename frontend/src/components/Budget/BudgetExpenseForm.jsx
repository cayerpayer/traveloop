import { useState } from 'react';
import { EXPENSE_CATEGORIES } from '../../hooks/useBudgetExpenses';

function getDefaultForm(tripOptions = []) {
  return {
    title: '',
    category: 'Food',
    amount: '',
    date: new Date().toISOString().slice(0, 10),
    notes: '',
    tripId: tripOptions[0]?.id || 'general',
  };
}

function getInitialForm(editingExpense, tripOptions) {
  if (!editingExpense) return getDefaultForm(tripOptions);
  return {
    title: editingExpense.title || '',
    category: editingExpense.category || 'Food',
    amount: String(editingExpense.amount || ''),
    date: editingExpense.date || new Date().toISOString().slice(0, 10),
    notes: editingExpense.notes || '',
    tripId: editingExpense.tripId || 'general',
  };
}

const emptyForm = {
  title: '',
  category: 'Food',
  amount: '',
  date: new Date().toISOString().slice(0, 10),
  notes: '',
  tripId: 'general',
};

export default function BudgetExpenseForm({ editingExpense, tripOptions, onSubmit, onCancel }) {
  const [form, setForm] = useState(() => getInitialForm(editingExpense, tripOptions));
  const [error, setError] = useState('');

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (error) setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const amount = Number(form.amount);

    if (!form.title.trim()) {
      setError('Add an expense title.');
      return;
    }
    if (!amount || amount <= 0) {
      setError('Enter an amount greater than zero.');
      return;
    }
    if (!form.date) {
      setError('Choose a date.');
      return;
    }

    onSubmit({ ...form, amount });

    if (!editingExpense) {
      setForm({
        ...emptyForm,
        tripId: tripOptions[0]?.id || 'general',
      });
    }
  };

  return (
    <form className="bp-expense-form" onSubmit={handleSubmit}>
      <div className="bp-panel-head">
        <div>
          <h3 className="cs-section-title"><i className="bi bi-plus-circle me-2"></i>{editingExpense ? 'Edit Expense' : 'Add Expense'}</h3>
          <p>Log every cost as it happens.</p>
        </div>
        {editingExpense && (
          <button className="bp-ghost-btn" type="button" onClick={onCancel}>
            <i className="bi bi-x-lg"></i>
            <span>Cancel</span>
          </button>
        )}
      </div>

      <div className="bp-form-grid">
        <label className="bp-field">
          <span>Expense title</span>
          <input value={form.title} onChange={(e) => updateField('title', e.target.value)} placeholder="Dinner in Goa" />
        </label>

        <label className="bp-field">
          <span>Category</span>
          <select value={form.category} onChange={(e) => updateField('category', e.target.value)}>
            {EXPENSE_CATEGORIES.map((category) => (
              <option key={category.value} value={category.value}>{category.value}</option>
            ))}
          </select>
        </label>

        <label className="bp-field">
          <span>Amount spent</span>
          <input type="number" min="0" step="1" value={form.amount} onChange={(e) => updateField('amount', e.target.value)} placeholder="2500" />
        </label>

        <label className="bp-field">
          <span>Date</span>
          <input type="date" value={form.date} onChange={(e) => updateField('date', e.target.value)} />
        </label>

        <label className="bp-field bp-field-wide">
          <span>Notes</span>
          <textarea value={form.notes} onChange={(e) => updateField('notes', e.target.value)} placeholder="Optional details" />
        </label>
      </div>

      {error && <div className="bp-form-error"><i className="bi bi-exclamation-circle"></i>{error}</div>}

      <button className="bp-submit-btn" type="submit">
        <i className={`bi ${editingExpense ? 'bi-check2-circle' : 'bi-plus-lg'}`}></i>
        <span>{editingExpense ? 'Save Expense' : 'Add Expense'}</span>
      </button>
    </form>
  );
}
