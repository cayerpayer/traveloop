/* ============================================
   HeroSection — Premium SaaS-style travel hero
   with animated icons, stats, and smooth animations.
   ============================================ */

import { useEffect, useRef } from 'react';
import './HeroSection.css';

// ── Floating travel icon data ──
const FLOATING_ICONS = [
  { icon: 'bi-airplane', top: '8%', left: '5%', delay: '0s', size: '2rem', duration: '8s' },
  { icon: 'bi-globe-americas', top: '22%', left: '82%', delay: '1s', size: '2.5rem', duration: '9s' },
  { icon: 'bi-map', top: '60%', left: '8%', delay: '2s', size: '2rem', duration: '7s' },
  { icon: 'bi-luggage', top: '75%', left: '75%', delay: '0.5s', size: '2.2rem', duration: '10s' },
];

// ── Stats data ──
const STATS = [
  { value: '10K+', label: 'Trips Planned', icon: 'bi-airplane-engines' },
  { value: '150+', label: 'Countries', icon: 'bi-globe2' },
  { value: '98%', label: 'User Satisfaction', icon: 'bi-heart-fill' },
];

export default function HeroSection() {
  const contentRef = useRef(null);

  // ── Fade-in animation on mount ──
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (contentRef.current) {
      observer.observe(contentRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="hero-section" id="auth-hero-section">
      {/* Animated floating orbs */}
      <div className="hero-orb hero-orb-1"></div>
      <div className="hero-orb hero-orb-2"></div>
      <div className="hero-orb hero-orb-3"></div>

      {/* World map glow background */}
      <div className="hero-world-map"></div>

      {/* Floating travel icons */}
      <div className="hero-icons-container">
        {FLOATING_ICONS.map((item, i) => (
          <div
            key={i}
            className="floating-icon"
            style={{
              top: item.top,
              left: item.left,
              animationDelay: item.delay,
              animationDuration: item.duration,
              fontSize: item.size,
            }}
          >
            <i className={`bi ${item.icon}`}></i>
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="hero-content" ref={contentRef}>
        {/* Main Heading */}
        <h1 className="hero-title fade-in-up delay-1">
          <span className="hero-title-line">Plan Your</span>
          <span className="hero-title-line hero-gradient-text">Dream Journey</span>
        </h1>

        {/* Subtitle */}
        <p className="hero-subtitle fade-in-up delay-2">
          Smart itineraries, budget tracking, and collaborative travel planning in one place.
        </p>

        {/* Stats cards */}
        <div className="hero-stats fade-in-up delay-3">
          {STATS.map((stat, i) => (
            <div key={i} className="stat-card">
              <div className="stat-icon-wrap">
                <i className={`bi ${stat.icon}`}></i>
              </div>
              <span className="stat-value">{stat.value}</span>
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
