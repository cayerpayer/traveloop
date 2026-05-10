/* ============================================
   TripCard — Premium horizontal trip card with
   image, progress bar, glassmorphism overlay.
   ============================================ */

import './TripCard.css';

export default function TripCard({ trip, index }) {
  return (
    <div
      className="trip-card-premium fade-in-up"
      style={{ animationDelay: `${0.1 + index * 0.12}s` }}
      id={`trip-card-${trip.id}`}
    >
      {/* Image */}
      <div className="tcp-image-wrap">
        <img src={trip.image} alt={trip.title} className="tcp-image" loading="lazy" />
        <div className="tcp-image-overlay"></div>
        <span className="tcp-status" style={{
          color: trip.statusColor,
          background: `${trip.statusColor}18`,
          borderColor: `${trip.statusColor}35`,
        }}>
          {trip.status}
        </span>
      </div>

      {/* Info */}
      <div className="tcp-body">
        <h3 className="tcp-title">{trip.title}</h3>
        <p className="tcp-destination">
          <i className="bi bi-geo-alt me-1"></i>{trip.destination}
        </p>

        <div className="tcp-meta">
          <span className="tcp-meta-item">
            <i className="bi bi-calendar3"></i>{trip.startDate} – {trip.endDate}
          </span>
          <span className="tcp-meta-item">
            <i className="bi bi-clock"></i>{trip.days} days
          </span>
          <span className="tcp-meta-item">
            <i className="bi bi-people"></i>{trip.travelers} travelers
          </span>
        </div>

        {/* Budget & Progress */}
        <div className="tcp-budget-row">
          <div className="tcp-budget-info">
            <span className="tcp-budget-label">Budget</span>
            <span className="tcp-budget-value">${trip.budget.toLocaleString()}</span>
          </div>
          <div className="tcp-budget-info">
            <span className="tcp-budget-label">Spent</span>
            <span className="tcp-budget-spent">${trip.spent.toLocaleString()}</span>
          </div>
        </div>

        <div className="tcp-progress-wrap">
          <div className="tcp-progress-bar">
            <div
              className="tcp-progress-fill"
              style={{ width: `${trip.progress}%` }}
            ></div>
          </div>
          <span className="tcp-progress-text">{trip.progress}% planned</span>
        </div>

        <button className="tcp-view-btn" id={`view-trip-${trip.id}`}>
          View Details <i className="bi bi-arrow-right ms-1"></i>
        </button>
      </div>
    </div>
  );
}
