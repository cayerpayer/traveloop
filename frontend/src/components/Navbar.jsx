/* ============================================
   Navbar — Responsive glassmorphism navigation
   with auth-aware links and user avatar.
   ============================================ */

import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Get user initials for avatar
  const getInitials = (name) => {
    if (!name) return '?';
    return name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <nav className="navbar-glass" id="main-navbar">
      <div className="container">
        <div className="navbar-inner">
          {/* Logo */}
          <Link to="/" className="navbar-brand" id="navbar-logo">
            <span className="brand-icon">
              <i className="bi bi-globe-americas"></i>
            </span>
            <span className="brand-text">Travel<span className="brand-accent">oop</span></span>
          </Link>

          {/* Desktop Nav */}
          <div className={`navbar-menu ${menuOpen ? 'open' : ''}`}>
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className={`nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`}
                  id="nav-dashboard"
                >
                  <i className="bi bi-grid-1x2 me-1"></i> Dashboard
                </Link>
                <div className="nav-user-section">
                  <div className="nav-avatar" id="nav-user-avatar">
                    {getInitials(user.name)}
                  </div>
                  <span className="nav-username">{user.name}</span>
                  <button onClick={handleLogout} className="btn-glass nav-btn" id="nav-logout-btn">
                    <i className="bi bi-box-arrow-right me-1"></i> Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className={`nav-link ${location.pathname === '/login' ? 'active' : ''}`}
                  id="nav-login"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="btn-gradient nav-btn"
                  id="nav-signup"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            className={`navbar-toggler ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation"
            id="navbar-toggler"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </nav>
  );
}
