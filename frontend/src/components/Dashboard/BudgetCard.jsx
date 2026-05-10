/* ============================================
   BudgetCard — Analytics card with animated
   counter, circular progress, trend indicator.
   ============================================ */

import { useState, useEffect, useRef } from 'react';
import './BudgetCard.css';

export default function BudgetCard({ icon, label, value, trend, color, percentage, index }) {
  const [displayValue, setDisplayValue] = useState(0);
  const cardRef = useRef(null);
  const animated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true;
          animateValue(0, value, 1500);
        }
      },
      { threshold: 0.3 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [value]);

  const animateValue = (start, end, duration) => {
    const startTime = performance.now();
    const step = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.floor(eased * (end - start) + start));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  const isPositive = trend?.startsWith('+');
  const circumference = 2 * Math.PI * 36;
  const strokeDashoffset = circumference - (circumference * (percentage || 0)) / 100;

  return (
    <div
      ref={cardRef}
      className="budget-card fade-in-up"
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
        <span className="bc-value">${displayValue.toLocaleString()}</span>
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
                  strokeDashoffset: animated.current ? strokeDashoffset : circumference,
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
