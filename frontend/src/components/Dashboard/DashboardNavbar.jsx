/* ============================================
   DashboardNavbar — Glassmorphism sticky navbar
   with search, notifications, profile dropdown,
   and dark mode toggle.
   ============================================ */

import { useState, useEffect, useMemo, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { BUDGET_DATA, DESTINATIONS_DATA, TRIPS_DATA } from '../../data/dashboardData';
import './DashboardNavbar.css';

const SIDEBAR_LINKS = [
  { to: '/dashboard', label: 'Dashboard', icon: 'bi-grid-1x2' },
  { to: '/trips', label: 'My Trips', icon: 'bi-airplane-engines' },
  { to: '/destinations', label: 'Destinations', icon: 'bi-globe-americas' },
  { to: '/itinerary-builder', label: 'Planner', icon: 'bi-calendar3-week' },
  { to: '/budget', label: 'Budget', icon: 'bi-wallet2' },
  { to: '/notes', label: 'Journal', icon: 'bi-journal-text' },
  { to: '/packing', label: 'Packing', icon: 'bi-luggage' },
  { to: '/activities', label: 'Activities', icon: 'bi-lightning-charge' },
];

export default function DashboardNavbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const profileRef = useRef(null);
  const notifRef = useRef(null);
  const searchRef = useRef(null);

  // Scroll detection for glass blur effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.add('dashboard-sidebar-layout');
    document.body.classList.toggle('dashboard-sidebar-collapsed', sidebarCollapsed);
    document.documentElement.style.setProperty('--dashboard-sidebar-width', sidebarCollapsed ? '92px' : '286px');

    return () => {
      document.body.classList.remove('dashboard-sidebar-layout', 'dashboard-sidebar-collapsed');
      document.documentElement.style.removeProperty('--dashboard-sidebar-width');
    };
  }, [sidebarCollapsed]);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false);
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false);
      if (searchRef.current && !searchRef.current.contains(e.target)) setSearchOpen(false);
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
  const searchItems = useMemo(() => {
    const budgetItems = [
      { label: 'Total Budget', value: `$${BUDGET_DATA.totalBudget.toLocaleString()}`, icon: 'bi-wallet2' },
      { label: 'Amount Spent', value: `$${BUDGET_DATA.amountSpent.toLocaleString()}`, icon: 'bi-credit-card' },
      { label: 'Savings', value: `$${BUDGET_DATA.savings.toLocaleString()}`, icon: 'bi-piggy-bank' },
      { label: 'Upcoming Expenses', value: `$${BUDGET_DATA.upcomingExpenses.toLocaleString()}`, icon: 'bi-calendar-check' },
    ];

    return [
      ...TRIPS_DATA.map((trip) => ({
        type: 'Trip',
        title: trip.title,
        meta: `${trip.destination} • ${trip.status}`,
        icon: 'bi-airplane-engines',
        path: '/trips',
        keywords: [trip.title, trip.destination, trip.status, String(trip.budget), String(trip.spent)],
      })),
      ...DESTINATIONS_DATA.map((destination) => ({
        type: 'Destination',
        title: `${destination.city}, ${destination.country}`,
        meta: `${destination.budget} • ${destination.bestSeason}`,
        icon: 'bi-geo-alt',
        path: '/destinations',
        keywords: [destination.city, destination.country, destination.budget, destination.bestSeason, ...destination.activities],
      })),
      ...budgetItems.map((item) => ({
        type: 'Budget',
        title: item.label,
        meta: item.value,
        icon: item.icon,
        path: '/budget',
        keywords: [item.label, item.value, 'budget', 'expense', 'saving', 'spent'],
      })),
    ];
  }, []);

  const searchResults = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return [];

    return searchItems
      .filter((item) => item.keywords.some((keyword) => keyword.toLowerCase().includes(query)))
      .slice(0, 7);
  }, [searchItems, searchQuery]);

  const handleSearchSelect = (path) => {
    setSearchOpen(false);
    setSearchQuery('');
    navigate(path);
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter' && searchResults.length > 0) {
      handleSearchSelect(searchResults[0].path);
    }
    if (e.key === 'Escape') {
      setSearchOpen(false);
    }
  };

  return (
    <>
    <aside className={`dashboard-sidebar ${sidebarCollapsed ? 'collapsed' : ''} ${sidebarOpen ? 'open' : ''}`} id="dashboard-sidebar">
      <div className="sidebar-ambient"></div>
      <div className="sidebar-shell">
        <div className="sidebar-top">
          <Link to="/dashboard" className="sidebar-brand" onClick={() => setSidebarOpen(false)}>
            <span className="sidebar-brand-icon">
              <i className="bi bi-globe-americas"></i>
            </span>
            <span className="sidebar-brand-copy">
              <span className="sidebar-brand-name">Traveloop</span>
              <span className="sidebar-brand-meta">AI travel OS</span>
            </span>
          </Link>
          <button
            className="sidebar-collapse-btn"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <i className={`bi bi-layout-sidebar-${sidebarCollapsed ? 'inset' : 'inset-reverse'}`}></i>
          </button>
        </div>

        <nav className="sidebar-nav" aria-label="Dashboard navigation">
          {SIDEBAR_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => `sidebar-nav-link ${isActive ? 'active' : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              <span className="sidebar-nav-icon"><i className={`bi ${link.icon}`}></i></span>
              <span className="sidebar-nav-label">{link.label}</span>
              <span className="sidebar-nav-glow"></span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-spotlight">
          <span className="sidebar-spotlight-icon"><i className="bi bi-stars"></i></span>
          <div>
            <p>Smart planner</p>
            <span>Build trips with AI signals</span>
          </div>
        </div>

        <div className="sidebar-bottom">
          <button className="sidebar-user-card" onClick={() => navigate('/profile')}>
            <div className="dash-avatar">{getInitials(user?.name)}</div>
            <div className="sidebar-user-copy">
              <span>{user?.name?.split(' ')[0] || 'Traveler'}</span>
              <small>View profile</small>
            </div>
            <i className="bi bi-gear sidebar-user-gear"></i>
          </button>
        </div>
      </div>
    </aside>

    {sidebarOpen && <button className="sidebar-scrim" onClick={() => setSidebarOpen(false)} aria-label="Close sidebar"></button>}

    <nav className={`dash-navbar ${scrolled ? 'scrolled' : ''}`} id="dashboard-navbar">
      <div className="container">
        <div className="dash-navbar-inner">
          <button className="dash-mobile-menu" onClick={() => setSidebarOpen(true)} aria-label="Open navigation">
            <i className="bi bi-list"></i>
          </button>

          {/* Search Bar */}
          <div className={`dash-search-wrapper ${searchOpen ? 'expanded' : ''}`} ref={searchRef}>
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
              onChange={(e) => { setSearchQuery(e.target.value); setSearchOpen(true); }}
              onFocus={() => setSearchOpen(true)}
              onKeyDown={handleSearchKeyDown}
              id="search-input"
            />
            {searchQuery && (
              <button className="dash-search-clear" onClick={() => setSearchQuery('')}>
                <i className="bi bi-x-lg"></i>
              </button>
            )}
            {searchOpen && searchQuery.trim() && (
              <div className="dash-search-results" role="listbox">
                <div className="dash-search-results-head">
                  <span>Search results</span>
                  <small>{searchResults.length} found</small>
                </div>
                {searchResults.length > 0 ? (
                  searchResults.map((result) => (
                    <button
                      key={`${result.type}-${result.title}`}
                      className="dash-search-result"
                      onClick={() => handleSearchSelect(result.path)}
                      type="button"
                    >
                      <span className="dash-search-result-icon"><i className={`bi ${result.icon}`}></i></span>
                      <span className="dash-search-result-copy">
                        <span className="dash-search-result-title">{result.title}</span>
                        <span className="dash-search-result-meta">{result.meta}</span>
                      </span>
                      <span className="dash-search-result-type">{result.type}</span>
                    </button>
                  ))
                ) : (
                  <div className="dash-search-empty">
                    <i className="bi bi-search"></i>
                    <span>No trips, destinations, or budget items found.</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Actions */}
          <div className="dash-navbar-actions">
            <button className="dash-quick-action" onClick={() => navigate('/create-trip')} id="top-new-trip">
              <i className="bi bi-plus-lg"></i>
              <span>New Trip</span>
            </button>

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
    </>
  );
}
