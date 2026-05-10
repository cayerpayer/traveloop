/* ============================================
   QuickActionCard — Interactive action card with
   hover glow, gradient border, animated icon.
   ============================================ */

import './QuickActionCard.css';

export default function QuickActionCard({ icon, title, description, gradient, index }) {
  return (
    <div
      className="quick-action-card fade-in-up"
      style={{ animationDelay: `${0.1 + index * 0.1}s`, '--card-gradient': gradient }}
      id={`quick-action-${index}`}
    >
      <div className="qac-glow"></div>
      <div className="qac-icon-wrap" style={{ background: gradient }}>
        <i className={`bi ${icon}`}></i>
      </div>
      <h3 className="qac-title">{title}</h3>
      <p className="qac-desc">{description}</p>
      <div className="qac-arrow">
        <i className="bi bi-arrow-right"></i>
      </div>
    </div>
  );
}
