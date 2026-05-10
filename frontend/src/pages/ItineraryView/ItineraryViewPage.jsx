/* ============================================
   ItineraryViewPage — Beautiful trip visualization
   ============================================ */
import { useState } from 'react';
import DashboardNavbar from '../../components/Dashboard/DashboardNavbar';
import EmptyState from '../../components/Shared/EmptyState';
import { getItem, STORAGE_KEYS } from '../../utils/localStorage';
import { CITIES_DATA } from '../../data/mockData';
import toast from 'react-hot-toast';
import './ItineraryViewPage.css';

const SLOT_ICONS = { Morning: 'bi-sunrise', Afternoon: 'bi-sun', Evening: 'bi-moon-stars' };
const VIEW_MODES = [
  { key: 'timeline', icon: 'bi-list-nested', label: 'Timeline' },
  { key: 'calendar', icon: 'bi-calendar3', label: 'Calendar' },
  { key: 'city', icon: 'bi-geo-alt', label: 'By City' },
];

export default function ItineraryViewPage() {
  const [viewMode, setViewMode] = useState('timeline');
  const itineraries = getItem(STORAGE_KEYS.ITINERARIES, []);
  const itinerary = itineraries[0] || null;

  const handleExport = () => toast.success('PDF export coming soon!');
  const handleShare = () => { navigator.clipboard.writeText(window.location.href); toast.success('Link copied!'); };

  if (!itinerary) {
    return (
      <div className="itinerary-view-page">
        <div className="animated-bg"></div>
        <DashboardNavbar />
        <main className="container iv-main">
          <EmptyState icon="bi-journal-text" title="No itinerary yet" message="Build one in the Itinerary Builder" />
        </main>
      </div>
    );
  }

  const totalActivities = itinerary.days.reduce((s, d) =>
    s + Object.values(d.slots).reduce((sum, slot) => sum + slot.length, 0), 0
  );

  return (
    <div className="itinerary-view-page">
      <div className="animated-bg"></div>
      <DashboardNavbar />
      <main className="container iv-main">
        {/* Hero */}
        <div className="iv-hero fade-in-up">
          <div className="iv-hero-content">
            <h1 className="iv-hero-title">{itinerary.title}</h1>
            <div className="iv-hero-stats">
              <span><i className="bi bi-calendar3"></i>{itinerary.totalDays} Days</span>
              <span><i className="bi bi-geo-alt"></i>{itinerary.cities.length} Cities</span>
              <span><i className="bi bi-lightning"></i>{totalActivities} Activities</span>
              <span><i className="bi bi-wallet2"></i>${itinerary.budget}</span>
            </div>
            <div className="iv-hero-cities">
              {itinerary.cities.map((c, i) => (
                <span key={c} className="iv-city-chip">
                  {CITIES_DATA.find(ci => ci.name === c)?.countryFlag} {c}
                  {i < itinerary.cities.length - 1 && <i className="bi bi-arrow-right ms-2"></i>}
                </span>
              ))}
            </div>
          </div>
          <div className="iv-hero-actions">
            <button className="btn-gradient btn-sm" onClick={handleExport}><i className="bi bi-file-pdf me-1"></i>Export PDF</button>
            <button className="btn-glass btn-sm" onClick={handleShare}><i className="bi bi-share me-1"></i>Share</button>
            <button className="btn-glass btn-sm" onClick={() => window.print()}><i className="bi bi-printer me-1"></i>Print</button>
          </div>
        </div>

        {/* View Mode Tabs */}
        <div className="iv-view-tabs fade-in-up delay-1">
          {VIEW_MODES.map(m => (
            <button key={m.key} className={`iv-view-tab ${viewMode === m.key ? 'active' : ''}`} onClick={() => setViewMode(m.key)}>
              <i className={`bi ${m.icon} me-1`}></i>{m.label}
            </button>
          ))}
        </div>

        {/* Timeline View */}
        {viewMode === 'timeline' && (
          <div className="iv-timeline">
            {itinerary.days.map((day, i) => (
              <div key={day.id} className="iv-timeline-day fade-in-up" style={{ animationDelay: `${0.1 * i}s` }}>
                <div className="iv-tl-connector">
                  <div className="iv-tl-dot"></div>
                  {i < itinerary.days.length - 1 && <div className="iv-tl-line"></div>}
                </div>
                <div className="iv-tl-content">
                  <div className="iv-tl-day-header">
                    <span className="iv-tl-day-badge">Day {day.day}</span>
                  </div>
                  {Object.entries(day.slots).map(([slot, activities]) => (
                    activities.length > 0 && (
                      <div key={slot} className="iv-tl-slot">
                        <span className="iv-tl-slot-label"><i className={`bi ${SLOT_ICONS[slot]} me-1`}></i>{slot}</span>
                        {activities.map(act => (
                          <div key={act.slotId} className="iv-tl-act">
                            <img src={act.image} alt={act.name} className="iv-tl-act-img" />
                            <div className="iv-tl-act-info">
                              <span className="iv-tl-act-name">{act.name}</span>
                              <div className="iv-tl-act-meta">
                                <span><i className="bi bi-clock"></i>{act.duration}</span>
                                <span><i className="bi bi-wallet2"></i>${act.cost}</span>
                                <span><i className="bi bi-star-fill"></i>{act.rating}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )
                  ))}
                  {day.notes && <p className="iv-tl-notes"><i className="bi bi-journal-text me-1"></i>{day.notes}</p>}
                  {Object.values(day.slots).every(s => s.length === 0) && (
                    <p className="iv-tl-empty">No activities planned</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Calendar View */}
        {viewMode === 'calendar' && (
          <div className="iv-calendar-grid fade-in-up">
            {itinerary.days.map((day, i) => {
              const actCount = Object.values(day.slots).reduce((s, sl) => s + sl.length, 0);
              return (
                <div key={day.id} className="iv-cal-cell" style={{ animationDelay: `${0.05 * i}s` }}>
                  <div className="iv-cal-header">Day {day.day}</div>
                  <div className="iv-cal-body">
                    {actCount > 0 ? Object.entries(day.slots).map(([slot, acts]) =>
                      acts.map(a => <div key={a.slotId} className="iv-cal-act"><span className="iv-cal-dot" style={{ background: slot === 'Morning' ? '#F59E0B' : slot === 'Afternoon' ? '#06B6D4' : '#8B5CF6' }}></span>{a.name}</div>)
                    ) : <p className="iv-cal-empty">Free day</p>}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* City Grouped View */}
        {viewMode === 'city' && (
          <div className="iv-city-view fade-in-up">
            {itinerary.cities.map(cityName => {
              const city = CITIES_DATA.find(c => c.name === cityName);
              const cityActs = itinerary.days.flatMap(d => Object.values(d.slots).flat()).filter(a => a.city === cityName);
              return (
                <div key={cityName} className="iv-city-section">
                  <div className="iv-city-header">
                    {city && <img src={city.image} alt={city.name} className="iv-city-banner" />}
                    <div className="iv-city-overlay">
                      <h3>{city?.countryFlag} {cityName}</h3>
                      <span>{cityActs.length} activities</span>
                    </div>
                  </div>
                  {cityActs.length > 0 ? (
                    <div className="iv-city-acts">
                      {cityActs.map((act, idx) => (
                        <div key={idx} className="iv-tl-act">
                          <img src={act.image} alt={act.name} className="iv-tl-act-img" />
                          <div className="iv-tl-act-info">
                            <span className="iv-tl-act-name">{act.name}</span>
                            <div className="iv-tl-act-meta">
                              <span><i className="bi bi-clock"></i>{act.duration}</span>
                              <span><i className="bi bi-wallet2"></i>${act.cost}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : <p className="iv-tl-empty" style={{ padding: '1rem 1.5rem' }}>No activities yet in {cityName}</p>}
                </div>
              );
            })}
          </div>
        )}

        {/* Travel Tips */}
        <div className="iv-tips fade-in-up delay-3">
          <h3 className="cs-section-title"><i className="bi bi-lightbulb me-2"></i>Travel Tips</h3>
          <div className="iv-tips-grid">
            {['Pack light for tropical destinations', 'Keep digital copies of all documents', 'Book activities in advance to save money'].map((tip, i) => (
              <div key={i} className="iv-tip-card">
                <i className="bi bi-check-circle-fill"></i>
                <span>{tip}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
