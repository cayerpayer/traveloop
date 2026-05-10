/* ============================================
   HeroSection — Premium SaaS-style travel hero
   with animated icons, stats, and typewriter.
   ============================================ */

import { useState, useEffect } from 'react';
import './HeroSection.css';

// ── Floating travel icon data ──
const FLOATING_ICONS = [
  { icon: 'bi-airplane', top: '10%', left: '6%', delay: '0s', size: '2rem', duration: '6s' },
  { icon: 'bi-globe-americas', top: '20%', left: '80%', delay: '1s', size: '2.5rem', duration: '7s' },
  { icon: 'bi-compass', top: '55%', left: '12%', delay: '2s', size: '1.8rem', duration: '5s' },
  { icon: 'bi-map', top: '72%', left: '70%', delay: '0.5s', size: '2.2rem', duration: '8s' },
  { icon: 'bi-camera', top: '38%', left: '88%', delay: '1.5s', size: '1.6rem', duration: '6.5s' },
  { icon: 'bi-luggage', top: '88%', left: '22%', delay: '3s', size: '1.9rem', duration: '7.5s' },
  { icon: 'bi-sun', top: '6%', left: '52%', delay: '2.5s', size: '1.5rem', duration: '5.5s' },
  { icon: 'bi-geo-alt', top: '65%', left: '90%', delay: '1.8s', size: '1.4rem', duration: '6s' },
  { icon: 'bi-binoculars', top: '30%', left: '5%', delay: '3.5s', size: '1.3rem', duration: '7s' },
];

// ── Stats data ──
const STATS = [
  { value: '10K+', label: 'Trips Planned', icon: 'bi-airplane-engines' },
  { value: '150+', label: 'Destinations', icon: 'bi-globe2' },
  { value: '98%', label: 'Happy Travelers', icon: 'bi-heart-fill' },
];

export default function HeroSection() {
  const [typedText, setTypedText] = useState('');
  const fullText = 'Plan Extraordinary Journeys';

  // ── Typewriter effect ──
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      setTypedText(fullText.slice(0, index + 1));
      index++;
      if (index >= fullText.length) clearInterval(timer);
    }, 55);
    return () => clearInterval(timer);
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

      {/* Content */}
      <div className="hero-content">
        {/* Brand badge */}
        <div className="hero-badge fade-in-up delay-1">
          <span className="hero-badge-dot"></span>
          <i className="bi bi-stars me-1"></i>
          #1 AI-Powered Travel Platform
        </div>

        {/* Main Heading with typewriter */}
        <h1 className="hero-title fade-in-up delay-2">
          {typedText}
          <span className="cursor-blink">|</span>
        </h1>

        {/* Subtitle */}
        <p className="hero-subtitle fade-in-up delay-3">
          Build intelligent itineraries, track budgets, organize adventures,
          and explore the world with <span className="hero-brand-inline">Traveloop</span>.
        </p>

        {/* Stats cards */}
        <div className="hero-stats fade-in-up delay-4">
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

        {/* Floating airplane line */}
        <div className="airplane-trail fade-in delay-5">
          <div className="airplane-line"></div>
          <i className="bi bi-airplane airplane-fly"></i>
        </div>

        {/* Trust indicator */}
        <div className="hero-trust fade-in-up delay-5">
          <div className="hero-trust-avatars">
            <span className="hero-trust-av" style={{ background: 'linear-gradient(135deg, #4F46E5, #06B6D4)' }}>S</span>
            <span className="hero-trust-av" style={{ background: 'linear-gradient(135deg, #F59E0B, #F97316)' }}>M</span>
            <span className="hero-trust-av" style={{ background: 'linear-gradient(135deg, #10B981, #059669)' }}>A</span>
            <span className="hero-trust-av" style={{ background: 'linear-gradient(135deg, #8B5CF6, #6366F1)' }}>K</span>
          </div>
          <span className="hero-trust-text">Trusted by <strong>10,000+</strong> travelers worldwide</span>
        </div>
      </div>
    </div>
  );
}
