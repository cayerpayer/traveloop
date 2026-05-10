/* ============================================
   BudgetPage - Dynamic travel finance dashboard
   ============================================ */
import { useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import BudgetCharts from '../../components/Budget/BudgetCharts';
import BudgetExpenseForm from '../../components/Budget/BudgetExpenseForm';
import ExpenseHistory from '../../components/Budget/ExpenseHistory';
import DashboardNavbar from '../../components/Dashboard/DashboardNavbar';
import useBudgetExpenses, { EXPENSE_CATEGORIES } from '../../hooks/useBudgetExpenses';
import useTripStats from '../../hooks/useTripStats';
import { formatINR } from '../../utils/currency';
import './BudgetPage.css';

function getDateLabel(date) {
  const parsed = new Date(date);
  if (Number.isNaN(parsed.valueOf())) return 'Unknown';
  return parsed.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' });
}

function getCategoryMeta() {
  return EXPENSE_CATEGORIES.reduce((acc, category) => {
    acc[category.value] = category;
    return acc;
  }, {});
}

function buildCategoryData(expenses) {
  const totals = EXPENSE_CATEGORIES.reduce((acc, category) => {
    acc[category.value] = {
      name: category.value,
      value: 0,
      count: 0,
      color: category.color,
      icon: category.icon,
    };
    return acc;
  }, {});

  expenses.forEach((expense) => {
    const key = totals[expense.category] ? expense.category : 'Other';
    totals[key].value += Number(expense.amount) || 0;
    totals[key].count += 1;
  });

  return Object.values(totals);
}

function buildTrendData(expenses) {
  const totalsByDate = expenses.reduce((acc, expense) => {
    const date = expense.date || new Date().toISOString().slice(0, 10);
    acc[date] = acc[date] || { date, dateLabel: getDateLabel(date), amount: 0, count: 0 };
    acc[date].amount += Number(expense.amount) || 0;
    acc[date].count += 1;
    return acc;
  }, {});

  return Object.values(totalsByDate).sort((a, b) => new Date(a.date) - new Date(b.date));
}

export default function BudgetPage() {
  const [activeChart, setActiveChart] = useState('pie');
  const [editingExpense, setEditingExpense] = useState(null);
  const stats = useTripStats();
  const { expenses, loading, tripOptions, addExpense, updateExpense, deleteExpense } = useBudgetExpenses();

  const categoryMeta = useMemo(() => getCategoryMeta(), []);
  const sortedExpenses = useMemo(() => (
    [...expenses].sort((a, b) => new Date(b.date) - new Date(a.date))
  ), [expenses]);
  const categoryData = useMemo(() => buildCategoryData(expenses), [expenses]);
  const trendData = useMemo(() => buildTrendData(expenses), [expenses]);

  const totalBudget = stats.totalBudget;
  const totalSpent = expenses.reduce((sum, expense) => sum + (Number(expense.amount) || 0), 0);
  const remaining = totalBudget - totalSpent;
  const avgTrip = stats.totalTrips ? Math.round(totalSpent / stats.totalTrips) : 0;
  const hasExpenses = expenses.length > 0;
  const overBudget = totalBudget > 0 && totalSpent > totalBudget;
  const maxTrendAmount = Math.max(...trendData.map((day) => day.amount), 1);
  const topCategory = [...categoryData].sort((a, b) => b.value - a.value)[0];

  const summaryCards = [
    { label: 'Total Budget', value: formatINR(totalBudget), icon: 'bi-wallet2', color: '#4F46E5', trend: stats.hasTrips ? `${stats.totalTrips} trips` : 'No trips yet' },
    { label: 'Total Spent', value: formatINR(totalSpent), icon: 'bi-credit-card', color: '#06B6D4', trend: hasExpenses ? `${expenses.length} expenses` : 'No spend yet' },
    { label: 'Remaining', value: formatINR(remaining), icon: 'bi-piggy-bank', color: remaining >= 0 ? '#10B981' : '#EF4444', trend: remaining >= 0 ? 'On track' : 'Over budget' },
    { label: 'Avg / Trip', value: formatINR(avgTrip), icon: 'bi-calendar-day', color: '#F59E0B', trend: stats.totalTrips ? 'Based on expenses' : 'No trips yet' },
  ];

  const handleExpenseSubmit = (expenseData) => {
    if (editingExpense) {
      updateExpense(editingExpense.id, expenseData);
      setEditingExpense(null);
      toast.success('Expense updated');
      return;
    }
    addExpense(expenseData);
    toast.success('Expense added');
  };

  const handleDelete = (expenseId) => {
    deleteExpense(expenseId);
    if (editingExpense?.id === expenseId) setEditingExpense(null);
    toast.success('Expense deleted');
  };

  return (
    <div className="budget-page">
      <div className="animated-bg"></div>
      <DashboardNavbar />
      <main className="container budget-main">
        <div className="bp-header fade-in-up">
          <h1 className="bp-title">Budget <span className="gradient-text">Dashboard</span></h1>
          <p className="bp-subtitle">Track real expenses and optimize your travel budget</p>
        </div>

        {loading && (
          <div className="bp-loading fade-in-up">
            <span className="spinner-border spinner-border-sm"></span>
            <span>Loading budget data...</span>
          </div>
        )}

        {overBudget && (
          <div className="bp-alert fade-in-up">
            <i className="bi bi-exclamation-triangle-fill"></i>
            <span>You are over budget by {formatINR(Math.abs(remaining))}. Review high-spend categories below.</span>
          </div>
        )}

        <div className="bp-summary-grid">
          {summaryCards.map((card, i) => (
            <div key={card.label} className="bp-summary-card fade-in-up" style={{ animationDelay: `${0.1 + i * 0.1}s` }}>
              <div className="bp-summary-icon" style={{ background: `${card.color}18`, color: card.color }}><i className={`bi ${card.icon}`}></i></div>
              <div className="bp-summary-info">
                <span className="bp-summary-label">{card.label}</span>
                <span className="bp-summary-value">{card.value}</span>
                <span className="bp-summary-trend" style={{ color: card.color }}>{card.trend}</span>
              </div>
            </div>
          ))}
        </div>

        <section className="bp-workspace fade-in-up delay-1">
          <BudgetExpenseForm
            key={editingExpense?.id || 'new-expense'}
            editingExpense={editingExpense}
            tripOptions={tripOptions}
            onSubmit={handleExpenseSubmit}
            onCancel={() => setEditingExpense(null)}
          />

          <div className="bp-category-panel">
            <div className="bp-panel-head">
              <div>
                <h3 className="cs-section-title"><i className="bi bi-grid-3x3-gap me-2"></i>Categories</h3>
                <p>Live totals from entered expenses.</p>
              </div>
            </div>
            <div className="bp-category-list">
              {categoryData.map((category) => (
                <div className="bp-category-item" key={category.name}>
                  <span className="bp-category-icon" style={{ background: `${category.color}18`, color: category.color }}>
                    <i className={`bi ${category.icon}`}></i>
                  </span>
                  <div>
                    <span>{category.name}</span>
                    <small>{category.count} expense{category.count === 1 ? '' : 's'}</small>
                  </div>
                  <strong>{formatINR(category.value)}</strong>
                </div>
              ))}
            </div>
          </div>
        </section>

        <BudgetCharts
          activeChart={activeChart}
          categoryData={categoryData}
          trendData={trendData}
          hasExpenses={hasExpenses}
          onChartChange={setActiveChart}
        />

        <div className="bp-daywise fade-in-up delay-3">
          <h3 className="cs-section-title"><i className="bi bi-calendar3 me-2"></i>Spending Trend</h3>
          {trendData.length === 0 ? (
            <div className="bp-empty-state">
              <i className="bi bi-graph-up"></i>
              <span>Daily spending appears once expenses are added.</span>
            </div>
          ) : (
            <div className="bp-daywise-list">
              {trendData.map((day) => (
                <div key={day.date} className="bp-day-row">
                  <span className="bp-day-label">{day.dateLabel}</span>
                  <div className="bp-day-bar-wrap">
                    <div className="bp-day-bar" style={{ width: `${Math.max(6, (day.amount / maxTrendAmount) * 100)}%` }}></div>
                  </div>
                  <span className="bp-day-total">{formatINR(day.amount)}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <ExpenseHistory
          expenses={sortedExpenses}
          categoryMeta={categoryMeta}
          tripOptions={tripOptions}
          onEdit={setEditingExpense}
          onDelete={handleDelete}
        />

        <div className="bp-insights fade-in-up delay-5">
          <h3 className="cs-section-title"><i className="bi bi-lightbulb me-2"></i>Smart Savings Tips</h3>
          {hasExpenses ? (
            <div className="bp-insights-grid">
              <div className="bp-insight-card">
                <div className="bp-insight-icon"><i className={`bi ${categoryMeta[topCategory?.name]?.icon || 'bi-wallet2'}`}></i></div>
                <p className="bp-insight-tip">Your highest spend is {topCategory?.name} at {formatINR(topCategory?.value)}.</p>
                <span className="bp-insight-save">Review first</span>
              </div>
              <div className="bp-insight-card">
                <div className="bp-insight-icon"><i className="bi bi-piggy-bank"></i></div>
                <p className="bp-insight-tip">{remaining >= 0 ? `${formatINR(remaining)} remains in your trip budget.` : `You are ${formatINR(Math.abs(remaining))} over budget.`}</p>
                <span className="bp-insight-save">{remaining >= 0 ? 'Healthy buffer' : 'Needs action'}</span>
              </div>
              <div className="bp-insight-card">
                <div className="bp-insight-icon"><i className="bi bi-receipt-cutoff"></i></div>
                <p className="bp-insight-tip">Your average expense is {formatINR(Math.round(totalSpent / expenses.length))}.</p>
                <span className="bp-insight-save">Live average</span>
              </div>
            </div>
          ) : (
            <div className="bp-empty-state">
              <i className="bi bi-stars"></i>
              <span>Add expenses to receive budget insights based on your real spending.</span>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
