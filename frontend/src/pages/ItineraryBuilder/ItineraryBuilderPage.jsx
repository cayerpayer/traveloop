/* ============================================
   ItineraryBuilderPage — Day-wise planner
   ============================================ */
import { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import DashboardNavbar from '../../components/Dashboard/DashboardNavbar';
import { CITIES_DATA, ACTIVITIES_DATA } from '../../data/mockData';
import { getItem, setItem, STORAGE_KEYS } from '../../utils/localStorage';
import toast from 'react-hot-toast';
import './ItineraryBuilderPage.css';

const SLOTS = ['Morning', 'Afternoon', 'Evening'];
const SLOT_ICONS = { Morning: 'bi-sunrise', Afternoon: 'bi-sun', Evening: 'bi-moon-stars' };

function buildDays(count) {
  return Array.from({ length: count }, (_, i) => ({
    id: uuidv4(), day: i + 1, slots: { Morning: [], Afternoon: [], Evening: [] }, notes: '',
  }));
}

export default function ItineraryBuilderPage() {
  const [itinerary, setItinerary] = useState(() => {
    const saved = getItem(STORAGE_KEYS.ITINERARIES);
    if (saved && saved.length > 0) return saved[0];
    return { id: uuidv4(), title: 'My Trip', cities: ['Bali', 'Tokyo'], days: buildDays(5), budget: 3000, totalDays: 5 };
  });
  const [expandedDay, setExpandedDay] = useState(1);
  const [showActivityPicker, setShowActivityPicker] = useState(null); // { day, slot }
  const [activitySearch, setActivitySearch] = useState('');
  const [dayCount, setDayCount] = useState(itinerary.totalDays);

  const saveItinerary = useCallback((updated) => {
    setItinerary(updated);
    const all = getItem(STORAGE_KEYS.ITINERARIES, []);
    const idx = all.findIndex(it => it.id === updated.id);
    if (idx >= 0) all[idx] = updated; else all.unshift(updated);
    setItem(STORAGE_KEYS.ITINERARIES, all);
  }, []);

  const addActivityToSlot = (dayNum, slot, activity) => {
    const updated = { ...itinerary, days: itinerary.days.map(d => {
      if (d.day !== dayNum) return d;
      const exists = d.slots[slot].some(a => a.id === activity.id);
      if (exists) { toast.error('Already added'); return d; }
      return { ...d, slots: { ...d.slots, [slot]: [...d.slots[slot], { ...activity, slotId: uuidv4() }] } };
    })};
    saveItinerary(updated);
    setShowActivityPicker(null);
    toast.success(`Added to ${slot}`);
  };

  const removeActivityFromSlot = (dayNum, slot, slotId) => {
    const updated = { ...itinerary, days: itinerary.days.map(d => {
      if (d.day !== dayNum) return d;
      return { ...d, slots: { ...d.slots, [slot]: d.slots[slot].filter(a => a.slotId !== slotId) } };
    })};
    saveItinerary(updated);
  };

  const updateDayNotes = (dayNum, notes) => {
    const updated = { ...itinerary, days: itinerary.days.map(d => d.day === dayNum ? { ...d, notes } : d) };
    saveItinerary(updated);
  };

  const addDay = () => {
    const newDay = { id: uuidv4(), day: itinerary.days.length + 1, slots: { Morning: [], Afternoon: [], Evening: [] }, notes: '' };
    const updated = { ...itinerary, days: [...itinerary.days, newDay], totalDays: itinerary.days.length + 1 };
    saveItinerary(updated);
    setDayCount(updated.totalDays);
  };

  const totalCost = itinerary.days.reduce((sum, d) => {
    return sum + SLOTS.reduce((s, slot) => s + d.slots[slot].reduce((a, act) => a + (act.cost || 0), 0), 0);
  }, 0);

  const filteredActivities = ACTIVITIES_DATA.filter(a =>
    a.name.toLowerCase().includes(activitySearch.toLowerCase()) ||
    a.city.toLowerCase().includes(activitySearch.toLowerCase())
  );

  return (
    <div className="itinerary-builder-page">
      <div className="animated-bg"></div>
      <DashboardNavbar />
      <main className="container ib-main">
        <div className="ib-header fade-in-up">
          <h1 className="ib-title">Itinerary <span className="gradient-text">Builder</span></h1>
          <p className="ib-subtitle">Plan your day-by-day travel schedule</p>
        </div>

        <div className="ib-layout">
          {/* Left Sidebar — Cities */}
          <aside className="ib-sidebar fade-in-left delay-1">
            <h3 className="ib-side-title"><i className="bi bi-geo-alt me-2"></i>Trip Stops</h3>
            {itinerary.cities.map(cityName => {
              const city = CITIES_DATA.find(c => c.name === cityName);
              return city ? (
                <div key={city.id} className="ib-city-card">
                  <img src={city.image} alt={city.name} className="ib-city-img" />
                  <div className="ib-city-info">
                    <span className="ib-city-flag">{city.countryFlag}</span>
                    <span className="ib-city-name">{city.name}</span>
                    <span className="ib-city-weather"><i className={`bi ${city.weather.icon}`}></i>{city.weather.temp}</span>
                  </div>
                </div>
              ) : (
                <div key={cityName} className="ib-city-card"><div className="ib-city-info"><span className="ib-city-name">{cityName}</span></div></div>
              );
            })}

            {/* Budget Summary */}
            <div className="ib-budget-summary">
              <h4>Budget Summary</h4>
              <div className="ib-budget-row">
                <span>Total Budget</span><strong>${itinerary.budget.toLocaleString()}</strong>
              </div>
              <div className="ib-budget-row">
                <span>Spent</span><strong className="text-accent">${totalCost}</strong>
              </div>
              <div className="ib-budget-row">
                <span>Remaining</span><strong style={{ color: itinerary.budget - totalCost > 0 ? '#10B981' : '#EF4444' }}>${itinerary.budget - totalCost}</strong>
              </div>
            </div>
          </aside>

          {/* Center — Day Timeline */}
          <div className="ib-center">
            {itinerary.days.map((day, i) => (
              <div key={day.id} className={`ib-day-card fade-in-up ${expandedDay === day.day ? 'expanded' : ''}`} style={{ animationDelay: `${0.05 * i}s` }}>
                <button className="ib-day-header" onClick={() => setExpandedDay(expandedDay === day.day ? null : day.day)}>
                  <div className="ib-day-badge">Day {day.day}</div>
                  <span className="ib-day-acts">{SLOTS.reduce((s, sl) => s + day.slots[sl].length, 0)} activities</span>
                  <i className={`bi bi-chevron-${expandedDay === day.day ? 'up' : 'down'}`}></i>
                </button>

                {expandedDay === day.day && (
                  <div className="ib-day-body">
                    {SLOTS.map(slot => (
                      <div key={slot} className="ib-slot">
                        <div className="ib-slot-header">
                          <i className={`bi ${SLOT_ICONS[slot]}`}></i>
                          <span>{slot}</span>
                          <button className="ib-add-act-btn" onClick={() => { setShowActivityPicker({ day: day.day, slot }); setActivitySearch(''); }}>
                            <i className="bi bi-plus-lg"></i>
                          </button>
                        </div>
                        {day.slots[slot].length === 0 ? (
                          <p className="ib-slot-empty">No activities — tap + to add</p>
                        ) : (
                          day.slots[slot].map(act => (
                            <div key={act.slotId} className="ib-act-mini">
                              <img src={act.image} alt={act.name} className="ib-act-mini-img" />
                              <div className="ib-act-mini-info">
                                <span className="ib-act-mini-name">{act.name}</span>
                                <span className="ib-act-mini-meta">{act.duration} · ${act.cost}</span>
                              </div>
                              <button className="ib-act-remove" onClick={() => removeActivityFromSlot(day.day, slot, act.slotId)}>
                                <i className="bi bi-x"></i>
                              </button>
                            </div>
                          ))
                        )}
                      </div>
                    ))}
                    {/* Notes */}
                    <div className="ib-day-notes">
                      <label><i className="bi bi-journal-text me-1"></i>Notes</label>
                      <textarea
                        value={day.notes}
                        onChange={e => updateDayNotes(day.day, e.target.value)}
                        placeholder="Add notes for this day..."
                        rows={2}
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
            <button className="ib-add-day-btn" onClick={addDay}>
              <i className="bi bi-plus-circle me-2"></i>Add Day
            </button>
          </div>

          {/* Right Sidebar — Suggestions */}
          <aside className="ib-sidebar-right fade-in-right delay-2">
            <h3 className="ib-side-title"><i className="bi bi-stars me-2"></i>Suggestions</h3>
            {ACTIVITIES_DATA.slice(0, 4).map(act => (
              <div key={act.id} className="ib-suggest-card" onClick={() => { if (expandedDay) addActivityToSlot(expandedDay, 'Morning', act); else toast('Expand a day first'); }}>
                <img src={act.image} alt={act.name} className="ib-suggest-img" />
                <div className="ib-suggest-info">
                  <span className="ib-suggest-name">{act.name}</span>
                  <span className="ib-suggest-meta">${act.cost} · {act.rating}★</span>
                </div>
              </div>
            ))}
          </aside>
        </div>

        {/* Activity Picker Modal */}
        {showActivityPicker && (
          <div className="pk-modal-overlay" onClick={() => setShowActivityPicker(null)}>
            <div className="ib-picker-modal fade-in-up" onClick={e => e.stopPropagation()}>
              <div className="ib-picker-header">
                <h3>Add Activity — Day {showActivityPicker.day}, {showActivityPicker.slot}</h3>
                <button onClick={() => setShowActivityPicker(null)}><i className="bi bi-x-lg"></i></button>
              </div>
              <input type="text" className="pk-input" placeholder="Search activities..." value={activitySearch} onChange={e => setActivitySearch(e.target.value)} />
              <div className="ib-picker-list">
                {filteredActivities.map(act => (
                  <div key={act.id} className="ib-picker-item" onClick={() => addActivityToSlot(showActivityPicker.day, showActivityPicker.slot, act)}>
                    <img src={act.image} alt={act.name} className="ib-picker-img" />
                    <div className="ib-picker-info">
                      <span className="ib-picker-name">{act.name}</span>
                      <span className="ib-picker-meta">{act.city} · ${act.cost} · {act.duration}</span>
                    </div>
                    <i className="bi bi-plus-circle"></i>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
