/* ============================================
   BudgetPage — Travel finance dashboard
   ============================================ */
import { useMemo, useState } from 'react';
import { useTrips } from '../../context/TripContext';
import DashboardNavbar from '../../components/Dashboard/DashboardNavbar';
import { BUDGET_CATEGORIES, EXPENSE_TRENDS } from '../../data/mockData';
import { getDailyActivityCosts, getItineraryActivityCost, getItineraryForTripId } from '../../utils/itineraryStorage';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid, Legend } from 'recharts';
import './BudgetPage.css';

const COLORS = ['#4F46E5', '#06B6D4', '#F59E0B', '#10B981', '#EC4899', '#8B5CF6'];

export default function BudgetPage() {
  const { trips, activeTrip } = useTrips();
  const [activeChart, setActiveChart] = useState('pie');
  const selectedTrip = activeTrip || trips[0] || null;
  const activeItinerary = selectedTrip ? getItineraryForTripId(selectedTrip.id) : null;
  const itineraryActivityCost = getItineraryActivityCost(activeItinerary);
  const totalBudget = selectedTrip?.budget || 8500;
  const budgetCategories = useMemo(() => {
    if (!itineraryActivityCost) return BUDGET_CATEGORIES;
    return BUDGET_CATEGORIES.map((category) =>
      category.id === 'activities' ? { ...category, amount: itineraryActivityCost } : category
    );
  }, [itineraryActivityCost]);
  const expenseTrends = useMemo(() => {
    if (!activeItinerary) return EXPENSE_TRENDS;

    const dailyActivityCosts = getDailyActivityCosts(activeItinerary);
    return EXPENSE_TRENDS.map((day, index) => ({
      ...day,
      activities: dailyActivityCosts[index]?.activities || 0,
    }));
  }, [activeItinerary]);
  const totalSpent = budgetCategories.reduce((s, c) => s + c.amount, 0);
  const remaining = totalBudget - totalSpent;
  const dailyAvg = Math.round(totalSpent / 7);
  const overBudget = totalSpent > totalBudget;

  const summaryCards = [
    { label: 'Total Budget', value: `$${totalBudget.toLocaleString()}`, icon: 'bi-wallet2', color: '#4F46E5', trend: '+12%' },
    { label: 'Total Spent', value: `$${totalSpent.toLocaleString()}`, icon: 'bi-credit-card', color: '#06B6D4', trend: '+8%' },
    { label: 'Remaining', value: `$${remaining.toLocaleString()}`, icon: 'bi-piggy-bank', color: remaining > 0 ? '#10B981' : '#EF4444', trend: remaining > 0 ? 'On Track' : 'Over!' },
    { label: 'Daily Average', value: `$${dailyAvg}`, icon: 'bi-calendar-day', color: '#F59E0B', trend: '~$95/day' },
  ];

  const pieData = budgetCategories.map(c => ({ name: c.name, value: c.amount }));

  const customTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bp-tooltip">
          <p className="bp-tooltip-label">{payload[0].name || payload[0].dataKey}</p>
          <p className="bp-tooltip-value">${payload[0].value?.toLocaleString()}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="budget-page">
      <div className="animated-bg"></div>
      <DashboardNavbar />
      <main className="container budget-main">
        <div className="bp-header fade-in-up">
          <h1 className="bp-title">Budget <span className="gradient-text">Dashboard</span></h1>
          <p className="bp-subtitle">Track expenses and optimize your travel budget</p>
        </div>

        {overBudget && (
          <div className="bp-alert fade-in-up">
            <i className="bi bi-exclamation-triangle-fill"></i>
            <span>You're over budget! Consider reducing shopping or activity costs.</span>
          </div>
        )}

        {/* Summary Cards */}
        <div className="bp-summary-grid">
          {summaryCards.map((card, i) => (
            <div key={i} className="bp-summary-card fade-in-up" style={{ animationDelay: `${0.1 + i * 0.1}s` }}>
              <div className="bp-summary-icon" style={{ background: `${card.color}18`, color: card.color }}><i className={`bi ${card.icon}`}></i></div>
              <div className="bp-summary-info">
                <span className="bp-summary-label">{card.label}</span>
                <span className="bp-summary-value">{card.value}</span>
                <span className="bp-summary-trend" style={{ color: card.color }}>{card.trend}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="bp-charts-section fade-in-up delay-2">
          <div className="bp-charts-header">
            <h3 className="cs-section-title"><i className="bi bi-bar-chart-line me-2"></i>Expense Analysis</h3>
            <div className="bp-chart-tabs">
              {[{ key: 'pie', icon: 'bi-pie-chart' }, { key: 'bar', icon: 'bi-bar-chart' }, { key: 'line', icon: 'bi-graph-up' }].map(t => (
                <button key={t.key} className={`bp-chart-tab ${activeChart === t.key ? 'active' : ''}`} onClick={() => setActiveChart(t.key)}>
                  <i className={`bi ${t.icon}`}></i>
                </button>
              ))}
            </div>
          </div>

          <div className="bp-chart-container">
            {activeChart === 'pie' && (
              <ResponsiveContainer width="100%" height={320}>
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={70} outerRadius={120} paddingAngle={3} dataKey="value">
                    {pieData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <Tooltip content={customTooltip} />
                </PieChart>
              </ResponsiveContainer>
            )}
            {activeChart === 'bar' && (
              <ResponsiveContainer width="100%" height={320}>
                <BarChart data={budgetCategories.map(c => ({ name: c.name, amount: c.amount }))}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                  <XAxis dataKey="name" tick={{ fill: '#94A3B8', fontSize: 12 }} />
                  <YAxis tick={{ fill: '#94A3B8', fontSize: 12 }} />
                  <Tooltip content={customTooltip} />
                  <Bar dataKey="amount" radius={[6, 6, 0, 0]}>
                    {budgetCategories.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
            {activeChart === 'line' && (
              <ResponsiveContainer width="100%" height={320}>
                <LineChart data={expenseTrends}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                  <XAxis dataKey="day" tick={{ fill: '#94A3B8', fontSize: 12 }} />
                  <YAxis tick={{ fill: '#94A3B8', fontSize: 12 }} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="flights" stroke="#4F46E5" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="hotels" stroke="#06B6D4" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="food" stroke="#F59E0B" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="activities" stroke="#10B981" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>

          {/* Legend */}
          <div className="bp-legend">
            {budgetCategories.map((c, i) => (
              <div key={c.id} className="bp-legend-item">
                <span className="bp-legend-dot" style={{ background: COLORS[i] }}></span>
                <span className="bp-legend-name">{c.name}</span>
                <span className="bp-legend-val">${c.amount}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Day-wise Breakdown */}
        <div className="bp-daywise fade-in-up delay-3">
          <h3 className="cs-section-title"><i className="bi bi-calendar3 me-2"></i>Day-wise Breakdown</h3>
          <div className="bp-daywise-list">
            {expenseTrends.map((d, i) => {
              const dayTotal = d.flights + d.hotels + d.food + d.activities + d.transport;
              return (
                <div key={i} className="bp-day-row">
                  <span className="bp-day-label">{d.day}</span>
                  <div className="bp-day-bar-wrap">
                    <div className="bp-day-bar" style={{ width: `${(dayTotal / 2000) * 100}%` }}></div>
                  </div>
                  <span className="bp-day-total">${dayTotal}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Smart Insights */}
        <div className="bp-insights fade-in-up delay-4">
          <h3 className="cs-section-title"><i className="bi bi-lightbulb me-2"></i>Smart Savings Tips</h3>
          <div className="bp-insights-grid">
            {[
              { icon: 'bi-airplane', tip: 'Book flights 3 weeks early to save up to 25%', savings: '$320' },
              { icon: 'bi-cup-hot', tip: 'Try local street food to cut food costs by 40%', savings: '$180' },
              { icon: 'bi-bus-front', tip: 'Use public transport instead of taxis', savings: '$95' },
            ].map((ins, i) => (
              <div key={i} className="bp-insight-card">
                <div className="bp-insight-icon"><i className={`bi ${ins.icon}`}></i></div>
                <p className="bp-insight-tip">{ins.tip}</p>
                <span className="bp-insight-save">Save {ins.savings}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
