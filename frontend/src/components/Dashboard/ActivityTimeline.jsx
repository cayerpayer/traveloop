/* ============================================
   ActivityTimeline — Animated vertical timeline
   with icon badges and timestamps.
   ============================================ */

import './ActivityTimeline.css';

export default function ActivityTimeline({ activities }) {
  return (
    <div className="activity-timeline" id="activity-timeline">
      {activities.map((item, i) => (
        <div
          key={item.id}
          className="timeline-item fade-in-up"
          style={{ animationDelay: `${0.1 + i * 0.12}s` }}
        >
          <div className="timeline-line">
            <div className="timeline-dot" style={{ background: item.color, boxShadow: `0 0 12px ${item.color}40` }}>
              <i className={`bi ${item.icon}`}></i>
            </div>
            {i < activities.length - 1 && <div className="timeline-connector"></div>}
          </div>
          <div className="timeline-content">
            <h4 className="timeline-title">{item.title}</h4>
            <p className="timeline-desc">{item.description}</p>
            <span className="timeline-time">
              <i className="bi bi-clock me-1"></i>{item.time}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
