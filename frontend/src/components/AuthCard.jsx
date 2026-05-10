/* ============================================
   AuthCard — Glassmorphism wrapper for auth
   forms (login / signup).
   ============================================ */

import './AuthCard.css';

export default function AuthCard({ children, title, subtitle }) {
  return (
    <div className="auth-card-wrapper page-transition" id="auth-card">
      <div className="auth-card glass-card">
        {/* Logo */}
        <div className="auth-logo">
          <span className="auth-logo-icon">
            <i className="bi bi-globe-americas"></i>
          </span>
          <span className="auth-logo-text">
            Travel<span className="gradient-text">oop</span>
          </span>
        </div>

        {/* Title */}
        {title && <h2 className="auth-title">{title}</h2>}
        {subtitle && <p className="auth-subtitle">{subtitle}</p>}

        {/* Form Content */}
        <div className="auth-body">
          {children}
        </div>
      </div>
    </div>
  );
}
