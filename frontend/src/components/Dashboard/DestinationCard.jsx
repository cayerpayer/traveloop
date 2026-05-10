/* ============================================
   DestinationCard — Recommended destination card
   with tilt effect, gradient overlay, save heart.
   ============================================ */

import { useState } from 'react';
import './DestinationCard.css';

export default function DestinationCard({ destination, index }) {
  const [saved, setSaved] = useState(destination.saved);

  return (
    <div
      className="dest-card fade-in-up"
      style={{ animationDelay: `${0.1 + index * 0.1}s` }}
      id={`dest-card-${destination.id}`}
    >
      {/* Image */}
      <div className="dest-image-wrap">
        <img src={destination.image} alt={destination.city} className="dest-image" loading="lazy" />
        <div className="dest-image-gradient"></div>

        {/* Match Badge */}
        <div className="dest-match-badge">
          <i className="bi bi-stars me-1"></i>{destination.match}% Match
        </div>

        {/* Save Button */}
        <button
          className={`dest-save-btn ${saved ? 'saved' : ''}`}
          onClick={(e) => { e.stopPropagation(); setSaved(!saved); }}
          id={`save-dest-${destination.id}`}
          aria-label="Save destination"
        >
          <i className={`bi ${saved ? 'bi-heart-fill' : 'bi-heart'}`}></i>
        </button>

        {/* City overlay */}
        <div className="dest-city-overlay">
          <h3 className="dest-city">{destination.city}</h3>
          <span className="dest-country">{destination.country}</span>
        </div>
      </div>

      {/* Body */}
      <div className="dest-body">
        <div className="dest-info-row">
          <div className="dest-info-item">
            <i className="bi bi-wallet2"></i>
            <span>{destination.budget}</span>
          </div>
          <div className="dest-info-item">
            <i className="bi bi-calendar-heart"></i>
            <span>{destination.bestSeason}</span>
          </div>
        </div>

        {/* Activity Tags */}
        <div className="dest-tags">
          {destination.activities.map((act) => (
            <span key={act} className="dest-tag">{act}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
