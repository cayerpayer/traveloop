/* ============================================
   TravelInsightCard — AI-style insight card with
   glow effects and recommendation badges.
   ============================================ */

import './TravelInsightCard.css';

export default function TravelInsightCard({ insight, index }) {
  return (
    <div
      className="insight-card fade-in-up"
      style={{ animationDelay: `${0.1 + index * 0.12}s` }}
      id={`insight-card-${insight.id}`}
    >
      <div className="insight-glow"></div>
      <div className="insight-header">
        <div className="insight-icon-wrap">
          <i className={`bi ${insight.icon}`}></i>
        </div>
        <span className="insight-badge" style={{
          color: insight.badgeColor,
          background: `${insight.badgeColor}15`,
          borderColor: `${insight.badgeColor}30`,
        }}>
          <i className="bi bi-lightning-fill me-1"></i>{insight.badge}
        </span>
      </div>
      <h4 className="insight-title">{insight.title}</h4>
      <p className="insight-desc">{insight.description}</p>
      <button className="insight-action">
        Learn More <i className="bi bi-arrow-right ms-1"></i>
      </button>
    </div>
  );
}
