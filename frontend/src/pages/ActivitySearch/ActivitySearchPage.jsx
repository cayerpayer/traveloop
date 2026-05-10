/* ============================================
   ActivitySearchPage — Activity exploration
   ============================================ */
import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTrips } from '../../context/TripContext';
import DashboardNavbar from '../../components/Dashboard/DashboardNavbar';
import SearchFilters from '../../components/Shared/SearchFilters';
import EmptyState from '../../components/Shared/EmptyState';
import { ACTIVITIES_DATA } from '../../data/mockData';
import { getItem, setItem, STORAGE_KEYS } from '../../utils/localStorage';
import { addActivityToTripItinerary, getActivityIdsForItinerary, getOrCreateItineraryForTrip } from '../../utils/itineraryStorage';
import toast from 'react-hot-toast';
import './ActivitySearchPage.css';

const CATEGORIES = ['Adventure', 'Food Tours', 'Beaches', 'Museums', 'Hiking', 'Nightlife', 'Shopping'];

export default function ActivitySearchPage() {
  const navigate = useNavigate();
  const { trips, activeTrip, setActiveTripId, addActivityToTripSummary } = useTrips();
  const [query, setQuery] = useState('');
  const [catFilter, setCatFilter] = useState('All');
  const [saved, setSaved] = useState(() => getItem(STORAGE_KEYS.SAVED_ACTIVITIES, []));
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [itineraryVersion, setItineraryVersion] = useState(0);

  const selectedTrip = activeTrip || trips[0] || null;
  const selectedTripId = selectedTrip?.id || '';

  const filtered = useMemo(() => {
    let list = ACTIVITIES_DATA;
    if (query) list = list.filter(a => a.name.toLowerCase().includes(query.toLowerCase()) || a.city.toLowerCase().includes(query.toLowerCase()));
    if (catFilter !== 'All') list = list.filter(a => a.category === catFilter);
    return list;
  }, [query, catFilter]);

  const addedActivityIds = useMemo(() => {
    void itineraryVersion;
    if (!selectedTrip) return [];
    return getActivityIdsForItinerary(getOrCreateItineraryForTrip(selectedTrip));
  }, [selectedTrip, itineraryVersion]);

  const toggleSave = (id) => {
    const next = saved.includes(id) ? saved.filter(x => x !== id) : [...saved, id];
    setSaved(next);
    setItem(STORAGE_KEYS.SAVED_ACTIVITIES, next);
    toast.success(next.includes(id) ? 'Activity saved!' : 'Removed');
  };

  const handleTripChange = (tripId) => {
    setActiveTripId(tripId);
    setItineraryVersion((version) => version + 1);
  };

  const handleAddActivity = (activity, closeModal = false) => {
    const trip = trips.find((item) => item.id === selectedTripId) || selectedTrip;

    if (!trip) {
      toast.error('Create a trip before adding activities');
      navigate('/create-trip');
      return;
    }

    setActiveTripId(trip.id);
    const result = addActivityToTripItinerary({ trip, activity });

    if (!result.added) {
      toast.error(result.reason === 'duplicate' ? 'Already added to this itinerary' : 'Select a trip first');
      return;
    }

    addActivityToTripSummary(trip.id, result.activity);
    setItineraryVersion((version) => version + 1);
    if (closeModal) setSelectedActivity(null);
    toast.success(`Added to ${trip.tripName}`);
  };

  const isAdded = (activityId) => addedActivityIds.includes(activityId);

  return (
    <div className="activity-search-page">
      <div className="animated-bg"></div>
      <DashboardNavbar />
      <main className="container activity-search-main">
        <div className="as-header fade-in-up">
          <h1 className="as-title">Explore <span className="gradient-text">Activities</span></h1>
          <p className="as-subtitle">Find amazing experiences at your destinations</p>
        </div>

        <div className="as-trip-select-wrap fade-in-up delay-1">
          <div>
            <span className="as-trip-label">Adding to itinerary</span>
            <strong>{selectedTrip?.tripName || 'No trip selected'}</strong>
          </div>
          {trips.length > 0 ? (
            <select className="as-trip-select" value={selectedTripId} onChange={(e) => handleTripChange(e.target.value)}>
              {trips.map((trip) => (
                <option key={trip.id} value={trip.id}>{trip.tripName}</option>
              ))}
            </select>
          ) : (
            <button className="btn-gradient btn-sm" onClick={() => navigate('/create-trip')}>
              <i className="bi bi-plus-circle me-1"></i>Create Trip
            </button>
          )}
        </div>

        {/* AI Recommendations Banner */}
        <div className="as-ai-banner fade-in-up delay-2">
          <div className="as-ai-icon"><i className="bi bi-stars"></i></div>
          <div>
            <h4>AI Recommendations</h4>
            <p>Based on your travel style, we suggest trying adventure and food tour activities.</p>
          </div>
        </div>

        <SearchFilters
          placeholder="Search activities, cities..."
          filters={CATEGORIES}
          value={query}
          onSearch={setQuery}
          onFilter={setCatFilter}
        />

        {filtered.length === 0 ? (
          <EmptyState icon="bi-lightning" title="No activities found" message="Try different filters" />
        ) : (
          <div className="as-grid">
            {filtered.map((act, i) => (
              <div key={act.id} className="as-card fade-in-up" style={{ animationDelay: `${0.1 + i * 0.08}s` }} onClick={() => setSelectedActivity(act)}>
                <div className="as-card-img-wrap">
                  <img src={act.image} alt={act.name} className="as-card-img" loading="lazy" />
                  <div className="as-card-img-overlay"></div>
                  <span className="as-card-cat">{act.category}</span>
                  <button className={`as-save-btn ${saved.includes(act.id) ? 'saved' : ''}`} onClick={(e) => { e.stopPropagation(); toggleSave(act.id); }}>
                    <i className={`bi ${saved.includes(act.id) ? 'bi-bookmark-fill' : 'bi-bookmark'}`}></i>
                  </button>
                </div>
                <div className="as-card-body">
                  <h3 className="as-card-name">{act.name}</h3>
                  <p className="as-card-city"><i className="bi bi-geo-alt me-1"></i>{act.city}</p>
                  <p className="as-card-desc">{act.description}</p>
                  <div className="as-card-meta">
                    <span className="as-meta"><i className="bi bi-star-fill"></i>{act.rating} ({act.reviews})</span>
                    <span className="as-meta"><i className="bi bi-clock"></i>{act.duration}</span>
                    <span className="as-meta"><i className="bi bi-speedometer2"></i>{act.difficulty}</span>
                  </div>
                  <div className="as-card-footer">
                    <span className="as-price">${act.cost}</span>
                    <button
                      className={`as-add-btn ${isAdded(act.id) ? 'added' : ''}`}
                      disabled={isAdded(act.id)}
                      onClick={(e) => { e.stopPropagation(); handleAddActivity(act); }}
                    >
                      <i className={`bi ${isAdded(act.id) ? 'bi-check2' : 'bi-plus-lg'} me-1`}></i>
                      {isAdded(act.id) ? 'Added' : 'Add'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Detail Modal */}
        {selectedActivity && (
          <div className="as-modal-overlay" onClick={() => setSelectedActivity(null)}>
            <div className="as-detail-modal fade-in-up" onClick={e => e.stopPropagation()}>
              <button className="as-modal-close" onClick={() => setSelectedActivity(null)}><i className="bi bi-x-lg"></i></button>
              <img src={selectedActivity.image} alt={selectedActivity.name} className="as-modal-img" />
              <div className="as-modal-body">
                <span className="as-modal-cat">{selectedActivity.category}</span>
                <h2>{selectedActivity.name}</h2>
                <p className="as-modal-city"><i className="bi bi-geo-alt me-1"></i>{selectedActivity.city}</p>
                <p className="as-modal-desc">{selectedActivity.description}</p>
                <div className="as-modal-stats">
                  <div className="as-modal-stat"><i className="bi bi-star-fill"></i><span>{selectedActivity.rating}</span><small>{selectedActivity.reviews} reviews</small></div>
                  <div className="as-modal-stat"><i className="bi bi-clock"></i><span>{selectedActivity.duration}</span></div>
                  <div className="as-modal-stat"><i className="bi bi-speedometer2"></i><span>{selectedActivity.difficulty}</span></div>
                  <div className="as-modal-stat"><i className="bi bi-wallet2"></i><span>${selectedActivity.cost}</span></div>
                </div>
                <div className="as-modal-tags">
                  {selectedActivity.tags.map(t => <span key={t} className="cs-tag">{t}</span>)}
                </div>
                <div className="as-modal-actions">
                  <button
                    className="btn-gradient"
                    disabled={isAdded(selectedActivity.id)}
                    onClick={() => handleAddActivity(selectedActivity, true)}
                  >
                    <i className={`bi ${isAdded(selectedActivity.id) ? 'bi-check2' : 'bi-plus-lg'} me-1`}></i>
                    {isAdded(selectedActivity.id) ? 'Added to Itinerary' : 'Add to Itinerary'}
                  </button>
                  <button className="btn-glass" onClick={() => { toggleSave(selectedActivity.id); }}>
                    <i className={`bi ${saved.includes(selectedActivity.id) ? 'bi-bookmark-fill' : 'bi-bookmark'} me-1`}></i>Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
