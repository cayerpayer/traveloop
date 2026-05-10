import { Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { formatINR } from '../../utils/currency';

export default function BudgetCharts({ activeChart, categoryData, trendData, hasExpenses, onChartChange }) {
  const visibleCategories = categoryData.filter((category) => category.value > 0);

  const tooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;
    const point = payload[0];
    const name = point.payload?.name || point.payload?.dateLabel || label || point.name;
    return (
      <div className="bp-tooltip">
        <p className="bp-tooltip-label">{name}</p>
        <p className="bp-tooltip-value">{formatINR(point.value || 0)}</p>
      </div>
    );
  };

  return (
    <div className="bp-charts-section fade-in-up delay-2">
      <div className="bp-charts-header">
        <h3 className="cs-section-title"><i className="bi bi-bar-chart-line me-2"></i>Expense Analysis</h3>
        <div className="bp-chart-tabs">
          {[{ key: 'pie', icon: 'bi-pie-chart' }, { key: 'bar', icon: 'bi-bar-chart' }, { key: 'line', icon: 'bi-graph-up' }].map((tab) => (
            <button key={tab.key} className={`bp-chart-tab ${activeChart === tab.key ? 'active' : ''}`} onClick={() => onChartChange(tab.key)} type="button" aria-label={`Show ${tab.key} chart`}>
              <i className={`bi ${tab.icon}`}></i>
            </button>
          ))}
        </div>
      </div>

      <div className="bp-chart-container">
        {!hasExpenses && (
          <div className="bp-empty-chart">
            <i className="bi bi-clipboard-data"></i>
            <span>Add your first expense to unlock live analytics.</span>
          </div>
        )}

        {hasExpenses && activeChart === 'pie' && (
          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie data={visibleCategories} cx="50%" cy="50%" innerRadius={70} outerRadius={120} paddingAngle={3} dataKey="value">
                {visibleCategories.map((category) => <Cell key={category.name} fill={category.color} />)}
              </Pie>
              <Tooltip content={tooltip} />
            </PieChart>
          </ResponsiveContainer>
        )}

        {hasExpenses && activeChart === 'bar' && (
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={visibleCategories.map((category) => ({ ...category, amount: category.value }))}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="name" tick={{ fill: '#94A3B8', fontSize: 12 }} />
              <YAxis tick={{ fill: '#94A3B8', fontSize: 12 }} tickFormatter={(value) => `${Math.round(value / 1000)}K`} />
              <Tooltip content={tooltip} />
              <Bar dataKey="amount" radius={[6, 6, 0, 0]}>
                {visibleCategories.map((category) => <Cell key={category.name} fill={category.color} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}

        {hasExpenses && activeChart === 'line' && (
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="dateLabel" tick={{ fill: '#94A3B8', fontSize: 12 }} />
              <YAxis tick={{ fill: '#94A3B8', fontSize: 12 }} tickFormatter={(value) => `${Math.round(value / 1000)}K`} />
              <Tooltip content={tooltip} />
              <Legend />
              <Line type="monotone" dataKey="amount" name="Daily spend" stroke="#06B6D4" strokeWidth={3} dot={{ r: 4, fill: '#06B6D4' }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>

      <div className="bp-legend">
        {categoryData.map((category) => (
          <div key={category.name} className="bp-legend-item">
            <span className="bp-legend-dot" style={{ background: category.color }}></span>
            <span className="bp-legend-name">{category.name}</span>
            <span className="bp-legend-val">{formatINR(category.value)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
