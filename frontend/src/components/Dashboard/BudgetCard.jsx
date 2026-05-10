/* ============================================
   BudgetCard — Analytics card with animated
   counter, circular progress, trend indicator.
   ============================================ */

import useCountUp from '../../hooks/useCountUp';
import { formatINR } from '../../utils/currency';
import './BudgetCard.css';

export default function BudgetCard({ icon, label, value, trend, color, percentage, index, formatValue = formatINR, loading = false }) {
  const displayValue = useCountUp(value || 0, 900);

  const isPositive = trend?.startsWith('+');
  const circumference = 2 * Math.PI * 36;
  const strokeDashoffset = circumference - (circumference * (percentage || 0)) / 100;

  return (
    <div
      className={`budget-card fade-in-up ${loading ? 'is-loading' : ''}`}
      style={{ animationDelay: `${0.1 + index * 0.1}s` }}
      id={`budget-card-${index}`}
    >
      <div className="bc-top">
        <div className="bc-icon-wrap" style={{ background: `${color}18`, color }}>
          <i className={`bi ${icon}`}></i>
        </div>
        {trend && (
          <span className={`bc-trend ${isPositive ? 'positive' : 'negative'}`}>
            <i className={`bi bi-arrow-${isPositive ? 'up' : 'down'}-right`}></i>
            {trend}
          </span>
        )}
      </div>

      <div className="bc-value-row">
        <span className="bc-value">{loading ? ' ' : formatValue(displayValue)}</span>
        {percentage !== undefined && (
          <div className="bc-circle-wrap">
            <svg className="bc-circle" viewBox="0 0 80 80">
              <circle cx="40" cy="40" r="36" className="bc-circle-bg" />
              <circle
                cx="40" cy="40" r="36"
                className="bc-circle-fill"
                style={{
                  stroke: color,
                  strokeDasharray: circumference,
                  strokeDashoffset,
                }}
              />
            </svg>
            <span className="bc-circle-text" style={{ color }}>{percentage}%</span>
          </div>
        )}
      </div>

      <span className="bc-label">{label}</span>
    </div>
  );
}
