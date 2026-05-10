/* ============================================
   DashboardNavbar — Glassmorphism sticky navbar
   with search, notifications, profile dropdown,
   and dark mode toggle.
   ============================================ */

import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './DashboardNavbar.css';

export default function DashboardNavbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const profileRef = useRef(null);
  const notifRef = useRef(null);

  // Scroll detection for glass blur effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false);
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getInitials = (name) => {
    if (!name) return '?';
    return name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const notifications = [
    { id: 1, icon: 'bi-airplane', text: 'Bali trip starts in 5 days!', time: '1h ago', unread: true },
    { id: 2, icon: 'bi-cash-coin', text: 'Budget alert: 65% spent on Europe trip', time: '3h ago', unread: true },
    { id: 3, icon: 'bi-heart', text: 'Santorini added to trending', time: '1d ago', unread: false },
  ];

  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <nav className={`dash-navbar ${scrolled ? 'scrolled' : ''}`} id="dashboard-navbar">
      <div className="container">
        <div className="dash-navbar-inner">
          {/* Logo */}
          <a href="/dashboard" className="dash-brand" id="dash-logo">
            <span className="dash-brand-icon">
              <i className="bi bi-globe-americas"></i>
            </span>
            <span className="dash-brand-text">
              Travel<span className="dash-brand-accent">oop</span>
            </span>
          </a>

          {/* Search Bar */}
          <div className={`dash-search-wrapper ${searchOpen ? 'expanded' : ''}`}>
            <button
              className="dash-search-toggle"
              onClick={() => setSearchOpen(!searchOpen)}
              id="search-toggle"
              aria-label="Toggle search"
            >
              <i className="bi bi-search"></i>
            </button>
            <input
              type="text"
              className="dash-search-input"
              placeholder="Search destinations, trips, budgets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              id="search-input"
            />
            {searchQuery && (
              <button className="dash-search-clear" onClick={() => setSearchQuery('')}>
                <i className="bi bi-x-lg"></i>
              </button>
            )}
          </div>

          {/* Nav Links */}
          <div className="dash-nav-links">
            <a href="/dashboard" className="dash-nav-link" id="nav-dashboard">
              <i className="bi bi-grid-1x2"></i><span>Dashboard</span>
            </a>
            <a href="/trips" className="dash-nav-link" id="nav-trips">
              <i className="bi bi-airplane-engines"></i><span>My Trips</span>
            </a>
            <a href="/destinations" className="dash-nav-link" id="nav-destinations">
              <i className="bi bi-globe-americas"></i><span>Destinations</span>
            </a>
            <a href="/itinerary-builder" className="dash-nav-link" id="nav-planner">
              <i className="bi bi-calendar3"></i><span>Planner</span>
            </a>
            <a href="/budget" className="dash-nav-link" id="nav-budget">
              <i className="bi bi-wallet2"></i><span>Budget</span>
            </a>
            <a href="/notes" className="dash-nav-link" id="nav-notes">
              <i className="bi bi-journal-text"></i><span>Journal</span>
            </a>
          </div>

          {/* Right Actions */}
          <div className="dash-navbar-actions">
            {/* Notifications */}
            <div className="dash-notif-wrapper" ref={notifRef}>
              <button
                className="dash-icon-btn"
                onClick={() => { setNotifOpen(!notifOpen); setProfileOpen(false); }}
                id="notif-btn"
                aria-label="Notifications"
              >
                <i className="bi bi-bell"></i>
                {unreadCount > 0 && <span className="dash-notif-badge">{unreadCount}</span>}
              </button>
              {notifOpen && (
                <div className="dash-dropdown notif-dropdown" id="notif-dropdown">
                  <div className="dash-dropdown-header">
                    <h4>Notifications</h4>
                    <button className="dash-dropdown-mark">Mark all read</button>
                  </div>
                  {notifications.map((n) => (
                    <div key={n.id} className={`notif-item ${n.unread ? 'unread' : ''}`}>
                      <div className="notif-icon-wrap">
                        <i className={`bi ${n.icon}`}></i>
                      </div>
                      <div className="notif-content">
                        <p className="notif-text">{n.text}</p>
                        <span className="notif-time">{n.time}</span>
                      </div>
                      {n.unread && <span className="notif-dot"></span>}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Profile Dropdown */}
            <div className="dash-profile-wrapper" ref={profileRef}>
              <button
                className="dash-profile-btn"
                onClick={() => { setProfileOpen(!profileOpen); setNotifOpen(false); }}
                id="profile-btn"
              >
                <div className="dash-avatar">{getInitials(user?.name)}</div>
                <span className="dash-profile-name">{user?.name?.split(' ')[0]}</span>
                <i className={`bi bi-chevron-${profileOpen ? 'up' : 'down'} dash-chevron`}></i>
              </button>
              {profileOpen && (
                <div className="dash-dropdown profile-dropdown" id="profile-dropdown">
                  <div className="profile-dropdown-header">
                    <div className="dash-avatar lg">{getInitials(user?.name)}</div>
                    <div>
                      <p className="profile-name">{user?.name}</p>
                      <p className="profile-email">{user?.email}</p>
                    </div>
                  </div>
                  <div className="dash-dropdown-divider"></div>
                  <button className="dash-dropdown-item" id="profile-settings" onClick={() => { navigate('/profile'); setProfileOpen(false); }}>
                    <i className="bi bi-person"></i> Profile
                  </button>
                  <button className="dash-dropdown-item" onClick={() => { navigate('/packing'); setProfileOpen(false); }}>
                    <i className="bi bi-luggage"></i> Packing
                  </button>
                  <button className="dash-dropdown-item" onClick={() => { navigate('/activities'); setProfileOpen(false); }}>
                    <i className="bi bi-lightning"></i> Activities
                  </button>
                  <button className="dash-dropdown-item" onClick={() => { navigate('/shared'); setProfileOpen(false); }}>
                    <i className="bi bi-share"></i> Shared Trips
                  </button>
                  <div className="dash-dropdown-divider"></div>
                  <button className="dash-dropdown-item logout-item" onClick={handleLogout} id="nav-logout-btn">
                    <i className="bi bi-box-arrow-right"></i> Log Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
