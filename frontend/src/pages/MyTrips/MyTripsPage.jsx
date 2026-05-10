/* ============================================
   MyTripsPage — Trip management dashboard with
   search, filter, sort, trip cards grid, and
   delete confirmation modal.
   ============================================ */

import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTrips } from '../../context/TripContext';
import DashboardNavbar from '../../components/Dashboard/DashboardNavbar';
import toast from 'react-hot-toast';
import './MyTripsPage.css';

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'budget-high', label: 'Budget: High → Low' },
  { value: 'budget-low', label: 'Budget: Low → High' },
  { value: 'duration', label: 'Duration' },
];

const CATEGORY_FILTERS = ['All', 'Adventure', 'Luxury', 'Beach', 'Solo', 'Family', 'Road Trip', 'Backpacking'];

export default function MyTripsPage() {
  const { trips, deleteTrip } = useTrips();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [sortBy, setSortBy] = useState('newest');
  const [deleteModal, setDeleteModal] = useState({ open: false, trip: null });

  // Stats
  const stats = useMemo(() => {
    const uniqueDestinations = new Set();
    let totalBudget = 0;
    let upcoming = 0;
    trips.forEach((t) => {
      totalBudget += t.budget || 0;
      t.destinations?.forEach((d) => uniqueDestinations.add(d));
      if (t.status === 'upcoming' || t.status === 'planning') upcoming++;
    });
    return {
      total: trips.length,
      destinations: uniqueDestinations.size,
      upcoming,
      totalBudget,
    };
  }, [trips]);

  // Filter + Sort
  const filteredTrips = useMemo(() => {
    let result = [...trips];

    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter((t) =>
        t.tripName.toLowerCase().includes(q) ||
        t.description?.toLowerCase().includes(q) ||
        t.category?.toLowerCase().includes(q)
      );
    }

    // Category
    if (categoryFilter !== 'All') {
      result = result.filter((t) => t.category === categoryFilter);
    }

    // Sort
    switch (sortBy) {
      case 'oldest':
        result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case 'budget-high':
        result.sort((a, b) => (b.budget || 0) - (a.budget || 0));
        break;
      case 'budget-low':
        result.sort((a, b) => (a.budget || 0) - (b.budget || 0));
        break;
      case 'duration':
        result.sort((a, b) => {
          const dA = a.startDate && a.endDate ? (new Date(a.endDate) - new Date(a.startDate)) : 0;
          const dB = b.startDate && b.endDate ? (new Date(b.endDate) - new Date(b.startDate)) : 0;
          return dB - dA;
        });
        break;
      default:
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    return result;
  }, [trips, searchQuery, categoryFilter, sortBy]);

  const handleDelete = () => {
    if (!deleteModal.trip) return;
    deleteTrip(deleteModal.trip.id);
    toast.success('Trip deleted');
    setDeleteModal({ open: false, trip: null });
  };

  const getDuration = (start, end) => {
    if (!start || !end) return null;
    return Math.ceil((new Date(end) - new Date(start)) / (1000 * 60 * 60 * 24));
  };

  const formatBudget = (val) => {
    if (!val) return '—';
    if (val >= 100000) return `₹${(val / 100000).toFixed(1)}L`;
    return `₹${(val / 1000).toFixed(0)}K`;
  };

  const formatDate = (d) => {
    if (!d) return '';
    return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'upcoming': return '#06B6D4';
      case 'planning': return '#F59E0B';
      case 'completed': return '#10B981';
      default: return '#94A3B8';
    }
  };

  const getPrivacyIcon = (privacy) => {
    switch (privacy) {
      case 'shared': return 'bi-people';
      case 'public': return 'bi-globe';
      default: return 'bi-lock';
    }
  };

  return (
    <div className="my-trips-page page-transition" id="my-trips-page">
      <div className="animated-bg"></div>
      <DashboardNavbar />

      <main className="my-trips-main container">
        {/* Page Header */}
        <section className="mtp-header fade-in-up" id="trips-header">
          <div className="mtp-header-content">
            <span className="mtp-header-badge">
              <i className="bi bi-airplane-engines me-2"></i>My Journeys
            </span>
            <h1 className="mtp-header-title">My Journeys</h1>
            <p className="mtp-header-desc">Organize, manage, and relive your travel experiences.</p>
          </div>
          <button className="btn-gradient mtp-create-btn" onClick={() => navigate('/create-trip')} id="create-trip-cta">
            <i className="bi bi-plus-circle me-2"></i>Create New Trip
          </button>
        </section>

        {/* Stats Bar */}
        <section className="mtp-stats fade-in-up delay-1" id="trips-stats">
          {[
            { icon: 'bi-airplane', value: stats.total, label: 'Total Trips', color: '#4F46E5' },
            { icon: 'bi-geo-alt', value: stats.destinations, label: 'Destinations', color: '#06B6D4' },
            { icon: 'bi-calendar-check', value: stats.upcoming, label: 'Upcoming', color: '#F59E0B' },
            { icon: 'bi-wallet2', value: formatBudget(stats.totalBudget), label: 'Total Budget', color: '#10B981' },
          ].map((s, i) => (
            <div key={i} className="mtp-stat-card">
              <div className="mtp-stat-icon" style={{ background: `${s.color}18`, color: s.color }}>
                <i className={`bi ${s.icon}`}></i>
              </div>
              <div>
                <span className="mtp-stat-value">{s.value}</span>
                <span className="mtp-stat-label">{s.label}</span>
              </div>
            </div>
          ))}
        </section>

        {/* Search & Filter */}
        <section className="mtp-controls fade-in-up delay-2" id="trips-controls">
          <div className="mtp-search-wrap">
            <i className="bi bi-search mtp-search-icon"></i>
            <input type="text" className="mtp-search-input" placeholder="Search trips..."
              value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} id="trips-search" />
            {searchQuery && (
              <button className="mtp-search-clear" onClick={() => setSearchQuery('')}>
                <i className="bi bi-x-lg"></i>
              </button>
            )}
          </div>
          <div className="mtp-filter-group">
            <div className="mtp-category-pills">
              {CATEGORY_FILTERS.map((cat) => (
                <button key={cat}
                  className={`mtp-pill ${categoryFilter === cat ? 'active' : ''}`}
                  onClick={() => setCategoryFilter(cat)}>
                  {cat}
                </button>
              ))}
            </div>
            <select className="mtp-sort-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)} id="trips-sort">
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </section>

        {/* Results Count */}
        <div className="mtp-results-count fade-in">
          <span>{filteredTrips.length} trip{filteredTrips.length !== 1 ? 's' : ''} found</span>
        </div>

        {/* Trip Cards Grid */}
        {filteredTrips.length > 0 ? (
          <section className="mtp-grid" id="trips-grid">
            {filteredTrips.map((trip, i) => {
              const duration = getDuration(trip.startDate, trip.endDate);
              const statusColor = getStatusColor(trip.status);
              return (
                <div key={trip.id} className="mtp-card fade-in-up"
                  style={{ animationDelay: `${0.05 + i * 0.08}s` }} id={`trip-${trip.id}`}>
                  {/* Image */}
                  <div className="mtp-card-image-wrap">
                    <img src={trip.coverImage || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=500&fit=crop'}
                      alt={trip.tripName} className="mtp-card-image" loading="lazy" />
                    <div className="mtp-card-overlay"></div>
                    <span className="mtp-card-status" style={{ color: statusColor, background: `${statusColor}20`, borderColor: `${statusColor}40` }}>
                      {trip.status || 'draft'}
                    </span>
                    <span className="mtp-card-privacy">
                      <i className={`bi ${getPrivacyIcon(trip.privacy)}`}></i>
                    </span>
                    {trip.category && (
                      <span className="mtp-card-category">{trip.category}</span>
                    )}
                  </div>

                  {/* Body */}
                  <div className="mtp-card-body">
                    <h3 className="mtp-card-title">{trip.tripName}</h3>
                    {trip.startDate && (
                      <p className="mtp-card-dates">
                        <i className="bi bi-calendar3 me-1"></i>
                        {formatDate(trip.startDate)} – {formatDate(trip.endDate)}
                        {duration && <span className="mtp-card-duration">• {duration}d</span>}
                      </p>
                    )}
                    {trip.description && (
                      <p className="mtp-card-desc">{trip.description.slice(0, 80)}{trip.description.length > 80 ? '…' : ''}</p>
                    )}

                    <div className="mtp-card-meta">
                      {trip.destinations?.length > 0 && (
                        <span className="mtp-card-meta-item">
                          <i className="bi bi-geo-alt"></i>{trip.destinations.length} places
                        </span>
                      )}
                      <span className="mtp-card-meta-item">
                        <i className="bi bi-wallet2"></i>{formatBudget(trip.budget)}
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="mtp-card-actions">
                      <button className="mtp-action-btn view" title="View Details" id={`view-${trip.id}`}>
                        <i className="bi bi-eye"></i>
                      </button>
                      <button className="mtp-action-btn edit" title="Edit Trip" id={`edit-${trip.id}`}>
                        <i className="bi bi-pencil"></i>
                      </button>
                      <button className="mtp-action-btn share" title="Share Trip" id={`share-${trip.id}`}>
                        <i className="bi bi-share"></i>
                      </button>
                      <button className="mtp-action-btn delete" title="Delete Trip"
                        onClick={() => setDeleteModal({ open: true, trip })} id={`delete-${trip.id}`}>
                        <i className="bi bi-trash3"></i>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </section>
        ) : (
          /* Empty State */
          <section className="mtp-empty fade-in-up" id="trips-empty">
            <div className="mtp-empty-icon">
              <i className="bi bi-luggage"></i>
            </div>
            <h3 className="mtp-empty-title">Your next adventure starts here</h3>
            <p className="mtp-empty-desc">
              {searchQuery || categoryFilter !== 'All'
                ? 'No trips match your filters. Try adjusting your search.'
                : "You haven't created any trips yet. Start planning your dream journey!"}
            </p>
            <button className="btn-gradient mtp-empty-cta" onClick={() => navigate('/create-trip')} id="empty-create-btn">
              <i className="bi bi-plus-circle me-2"></i>Create Your First Trip
            </button>
          </section>
        )}
      </main>

      {/* Delete Confirmation Modal */}
      {deleteModal.open && (
        <div className="mtp-modal-backdrop" onClick={() => setDeleteModal({ open: false, trip: null })}>
          <div className="mtp-modal" onClick={(e) => e.stopPropagation()} id="delete-modal">
            <div className="mtp-modal-icon">
              <i className="bi bi-exclamation-triangle"></i>
            </div>
            <h3 className="mtp-modal-title">Delete Trip?</h3>
            <p className="mtp-modal-desc">
              Are you sure you want to delete <strong>"{deleteModal.trip?.tripName}"</strong>? This action cannot be undone.
            </p>
            <div className="mtp-modal-actions">
              <button className="mtp-modal-cancel" onClick={() => setDeleteModal({ open: false, trip: null })}>Cancel</button>
              <button className="mtp-modal-delete" onClick={handleDelete} id="confirm-delete-btn">
                <i className="bi bi-trash3 me-1"></i>Delete Trip
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
