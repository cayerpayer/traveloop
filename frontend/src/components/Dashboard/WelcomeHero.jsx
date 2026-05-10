/* ============================================
   WelcomeHero — Personalized hero section with
   animated greeting, floating tags, and CTAs.
   ============================================ */

import { useEffect, useState, useMemo } from 'react';
import { useAuth } from '../../context/AuthContext';
import { TRAVEL_QUOTES } from '../../data/dashboardData';
import './WelcomeHero.css';

const FLOATING_TAGS = ['🏖 Bali', '🗼 Paris', '🗻 Alps', '🌸 Tokyo', '🏜 Dubai', '🌊 Maldives'];

export default function WelcomeHero() {
  const { user } = useAuth();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [quoteIndex] = useState(() => Math.floor(Math.random() * TRAVEL_QUOTES.length));

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const greeting = useMemo(() => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  }, [currentTime]);

  const firstName = user?.name?.split(' ')[0] || 'Traveler';
  const quote = TRAVEL_QUOTES[quoteIndex];

  const formattedTime = currentTime.toLocaleTimeString('en-US', {
    hour: '2-digit', minute: '2-digit', hour12: true,
  });

  const formattedDate = currentTime.toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric', year: 'numeric',
  });

  return (
    <section className="welcome-hero" id="welcome-hero">
      <div className="hero-mesh">
        <div className="mesh-orb orb-1"></div>
        <div className="mesh-orb orb-2"></div>
        <div className="mesh-orb orb-3"></div>
      </div>
      <div className="hero-particles">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="particle" style={{
            left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`, animationDuration: `${3 + Math.random() * 4}s`,
          }}></div>
        ))}
      </div>
      <div className="hero-content">
        <div className="hero-left">
          <div className="hero-time-badge fade-in-up">
            <i className="bi bi-clock me-2"></i>
            <span className="hero-clock">{formattedTime}</span>
            <span className="hero-date-sep">•</span>
            <span className="hero-date">{formattedDate}</span>
          </div>
          <h1 className="hero-greeting fade-in-up delay-1">
            {greeting}, <span className="gradient-text">{firstName}</span>
            <span className="hero-wave">👋</span>
          </h1>
          <h2 className="hero-heading fade-in-up delay-2">
            Where Will Your Next<br />
            <span className="hero-heading-accent">Adventure</span> Begin?
          </h2>
          <p className="hero-subtext fade-in-up delay-3">
            Create intelligent travel plans, manage budgets, and explore dream destinations effortlessly.
          </p>
          <div className="hero-cta-group fade-in-up delay-4">
            <button className="btn-gradient hero-cta-primary" id="cta-plan-trip">
              <i className="bi bi-airplane me-2"></i>Plan New Trip
            </button>
            <button className="btn-glass hero-cta-secondary" id="cta-explore">
              <i className="bi bi-compass me-2"></i>Explore Destinations
            </button>
          </div>
          <div className="hero-quote fade-in-up delay-5">
            <i className="bi bi-quote hero-quote-icon"></i>
            <p className="hero-quote-text">"{quote.text}"</p>
            <span className="hero-quote-author">— {quote.author}</span>
          </div>
        </div>
        <div className="hero-right fade-in delay-3">
          <div className="hero-globe-container">
            <div className="hero-airplane">
              <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
                <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 00-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" fill="url(#planeGrad)"/>
                <defs><linearGradient id="planeGrad" x1="0" y1="0" x2="24" y2="24"><stop stopColor="#4F46E5"/><stop offset="1" stopColor="#06B6D4"/></linearGradient></defs>
              </svg>
              <div className="airplane-trail"></div>
            </div>
            {FLOATING_TAGS.map((tag, i) => (
              <span key={tag} className="floating-tag" style={{
                animationDelay: `${i * 0.7}s`,
                '--tag-x': `${30 + Math.cos((i * Math.PI * 2) / 6) * 42}%`,
                '--tag-y': `${30 + Math.sin((i * Math.PI * 2) / 6) * 38}%`,
              }}>{tag}</span>
            ))}
            <div className="orbit-ring"></div>
            <div className="orbit-ring orbit-ring-2"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
