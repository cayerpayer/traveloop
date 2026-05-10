import { formatINR } from '../../utils/currency';

function formatDate(date) {
  const parsed = new Date(date);
  if (Number.isNaN(parsed.valueOf())) return 'No date';
  return parsed.toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' });
}

export default function ExpenseHistory({ expenses, categoryMeta, tripOptions, onEdit, onDelete }) {
  const tripNameById = Object.fromEntries(tripOptions.map((trip) => [trip.id, trip.label]));

  return (
    <div className="bp-history fade-in-up delay-4">
      <div className="bp-panel-head">
        <div>
          <h3 className="cs-section-title"><i className="bi bi-receipt me-2"></i>Expense History</h3>
          <p>{expenses.length} recorded expense{expenses.length === 1 ? '' : 's'}</p>
        </div>
      </div>

      {expenses.length === 0 ? (
        <div className="bp-empty-state">
          <i className="bi bi-wallet2"></i>
          <span>No expenses yet.</span>
        </div>
      ) : (
        <div className="bp-history-list">
          {expenses.map((expense) => {
            const meta = categoryMeta[expense.category] || categoryMeta.Other;
            return (
              <div className="bp-expense-row" key={expense.id}>
                <div className="bp-expense-main">
                  <span className="bp-expense-icon" style={{ background: `${meta.color}18`, color: meta.color }}>
                    <i className={`bi ${meta.icon}`}></i>
                  </span>
                  <div>
                    <span className="bp-expense-title">{expense.title}</span>
                    <span className="bp-expense-meta">
                      {expense.category} / {formatDate(expense.date)} / {tripNameById[expense.tripId] || 'General travel'}
                    </span>
                    {expense.notes && <span className="bp-expense-notes">{expense.notes}</span>}
                  </div>
                </div>
                <div className="bp-expense-side">
                  <span className="bp-expense-amount">{formatINR(expense.amount)}</span>
                  <div className="bp-row-actions">
                    <button type="button" onClick={() => onEdit(expense)} aria-label={`Edit ${expense.title}`}>
                      <i className="bi bi-pencil"></i>
                    </button>
                    <button type="button" onClick={() => onDelete(expense.id)} aria-label={`Delete ${expense.title}`}>
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
