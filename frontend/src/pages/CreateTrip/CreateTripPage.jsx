/* ============================================
   CreateTripPage — Premium trip creation form
   with split layout, visual panel, and smart form.
   ============================================ */

import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTrips } from '../../context/TripContext';
import DashboardNavbar from '../../components/Dashboard/DashboardNavbar';
import useTripStats from '../../hooks/useTripStats';
import { formatCompactINR } from '../../utils/currency';
import toast from 'react-hot-toast';
import './CreateTripPage.css';

const CATEGORIES = [
  { value: 'Adventure', icon: 'bi-compass', emoji: '🏔' },
  { value: 'Luxury', icon: 'bi-gem', emoji: '💎' },
  { value: 'Beach', icon: 'bi-water', emoji: '🏖' },
  { value: 'Solo', icon: 'bi-person', emoji: '🧭' },
  { value: 'Family', icon: 'bi-people', emoji: '👨‍👩‍👧‍👦' },
  { value: 'Road Trip', icon: 'bi-car-front', emoji: '🚗' },
  { value: 'Backpacking', icon: 'bi-backpack', emoji: '🎒' },
];

const PRIVACY_OPTIONS = [
  { value: 'private', label: 'Private Trip', icon: 'bi-lock', desc: 'Only you can see' },
  { value: 'shared', label: 'Shared With Friends', icon: 'bi-people', desc: 'Invite travel buddies' },
  { value: 'public', label: 'Public Trip', icon: 'bi-globe', desc: 'Visible to everyone' },
];

const TRAVEL_TAGS = ['Adventure', 'Beach', 'Mountains', 'Luxury', 'Backpacking', 'Culture', 'Food', 'Nature'];

export default function CreateTripPage() {
  const { addTrip } = useTrips();
  const stats = useTripStats();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    tripName: '',
    startDate: '',
    endDate: '',
    destinations: '',
    description: '',
    category: '',
    budget: 50000,
    coverImage: '',
    privacy: 'private',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [coverPreview, setCoverPreview] = useState('');

  // Auto-calculate trip duration
  const tripDuration = useMemo(() => {
    if (!form.startDate || !form.endDate) return null;
    const start = new Date(form.startDate);
    const end = new Date(form.endDate);
    const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : null;
  }, [form.startDate, form.endDate]);

  // Detect travel season
  const travelSeason = useMemo(() => {
    if (!form.startDate) return '';
    const month = new Date(form.startDate).getMonth();
    if (month >= 2 && month <= 4) return '🌸 Spring Season';
    if (month >= 5 && month <= 7) return '☀️ Summer Season';
    if (month >= 8 && month <= 10) return '🍂 Autumn Season';
    return '❄️ Winter Season';
  }, [form.startDate]);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setCoverPreview(reader.result);
      handleChange('coverImage', reader.result);
    };
    reader.readAsDataURL(file);
  };

  const validate = () => {
    const errs = {};
    if (!form.tripName.trim()) errs.tripName = 'Trip name is required';
    if (!form.startDate) errs.startDate = 'Start date is required';
    if (!form.endDate) errs.endDate = 'End date is required';
    if (!form.destinations.trim()) errs.destinations = 'Add at least one destination';
    if (form.startDate && form.endDate && new Date(form.endDate) <= new Date(form.startDate)) {
      errs.endDate = 'End date must be after start date';
    }
    if (!form.category) errs.category = 'Please select a category';
    return errs;
  };

  const handleSubmit = async (e, isDraft = false) => {
    e.preventDefault();
    if (!isDraft) {
      const errs = validate();
      setErrors(errs);
      if (Object.keys(errs).length > 0) return;
    }

    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));

    const tripData = {
      ...form,
      destinations: form.destinations.split(',').map((item) => item.trim()).filter(Boolean),
      status: isDraft ? 'draft' : 'planning',
      coverImage: form.coverImage || `https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=500&fit=crop`,
    };

    addTrip(tripData);
    toast.success(isDraft ? 'Draft saved!' : 'Trip created successfully! ✈️');
    setLoading(false);
    navigate('/trips');
  };

  const formatBudget = (val) => {
    return formatCompactINR(val);
  };

  return (
    <div className="create-trip-page page-transition" id="create-trip-page">
      <div className="animated-bg"></div>
      <DashboardNavbar />

      <main className="create-trip-main">
        {/* Left Visual Panel */}
        <div className="ctp-visual-panel">
          <div className="ctp-visual-inner">
            {/* Decorative orbs */}
            <div className="ctp-orb ctp-orb-1"></div>
            <div className="ctp-orb ctp-orb-2"></div>

            {/* Airplane animation */}
            <div className="ctp-airplane-wrap">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" className="ctp-airplane-svg">
                <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 00-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" fill="url(#pg)"/>
                <defs><linearGradient id="pg" x1="0" y1="0" x2="24" y2="24"><stop stopColor="#4F46E5"/><stop offset="1" stopColor="#06B6D4"/></linearGradient></defs>
              </svg>
            </div>

            {/* Content */}
            <div className="ctp-visual-content">
              <div className="ctp-visual-badge">
                <i className="bi bi-stars me-2"></i>Create Your Journey
              </div>
              <h2 className="ctp-visual-title">
                Every Journey Begins<br />
                With a <span className="gradient-text">Single Step</span>
              </h2>
              <p className="ctp-visual-desc">
                Plan your dream trip with our smart travel planner. Set budgets, pick destinations, and share with friends.
              </p>

              {/* Travel Tags */}
              <div className="ctp-tags-wrap">
                {TRAVEL_TAGS.map((tag, i) => (
                  <span key={tag} className="ctp-float-tag" style={{ animationDelay: `${i * 0.3}s` }}>
                    {tag}
                  </span>
                ))}
              </div>

              {/* Trip Preview Card */}
              {form.tripName && (
                <div className="ctp-preview-card fade-in-up">
                  <div className="ctp-preview-header">
                    <i className="bi bi-airplane-engines me-2"></i>Trip Preview
                  </div>
                  <h4 className="ctp-preview-name">{form.tripName || 'Untitled Trip'}</h4>
                  {tripDuration && (
                    <span className="ctp-preview-duration">
                      <i className="bi bi-clock me-1"></i>{tripDuration} days
                    </span>
                  )}
                  {form.category && (
                    <span className="ctp-preview-cat">
                      {CATEGORIES.find((c) => c.value === form.category)?.emoji} {form.category}
                    </span>
                  )}
                  {travelSeason && <span className="ctp-preview-season">{travelSeason}</span>}
                  <span className="ctp-preview-budget">{formatBudget(form.budget)}</span>
                </div>
              )}
            </div>

            {/* Mini Stats */}
            <div className="ctp-mini-stats">
              <div className="ctp-mini-stat">
                <span className="ctp-mini-val">{stats.destinations}</span>
                <span className="ctp-mini-label">Destinations</span>
              </div>
              <div className="ctp-mini-stat">
                <span className="ctp-mini-val">{stats.totalTrips}</span>
                <span className="ctp-mini-label">Trips Created</span>
              </div>
              <div className="ctp-mini-stat">
                <span className="ctp-mini-val">4.9★</span>
                <span className="ctp-mini-label">Total Budget</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Form Panel */}
        <div className="ctp-form-panel">
          <div className="ctp-form-card">
            <div className="ctp-form-header">
              <h1 className="ctp-form-title">
                <i className="bi bi-airplane me-2"></i>Create New Trip
              </h1>
              <p className="ctp-form-subtitle">Fill in the details to start planning your adventure</p>
            </div>

            <form onSubmit={(e) => handleSubmit(e, false)} noValidate className="ctp-form" id="create-trip-form">
              {/* Trip Name */}
              <div className="ctp-field">
                <label className="ctp-label">Trip Name <span className="ctp-required">*</span></label>
                <div className={`ctp-input-wrap ${errors.tripName ? 'error' : ''} ${form.tripName ? 'has-value' : ''}`}>
                  <i className="bi bi-pencil ctp-input-icon"></i>
                  <input
                    type="text"
                    className="ctp-input"
                    placeholder="Summer Europe Adventure"
                    value={form.tripName}
                    onChange={(e) => handleChange('tripName', e.target.value)}
                    id="trip-name-input"
                  />
                </div>
                {errors.tripName && <span className="ctp-error">{errors.tripName}</span>}
              </div>

              {/* Destinations */}
              <div className="ctp-field">
                <label className="ctp-label">Destinations <span className="ctp-required">*</span></label>
                <div className={`ctp-input-wrap ${errors.destinations ? 'error' : ''} ${form.destinations ? 'has-value' : ''}`}>
                  <i className="bi bi-geo-alt ctp-input-icon"></i>
                  <input
                    type="text"
                    className="ctp-input"
                    placeholder="Goa, Jaipur, Manali"
                    value={form.destinations}
                    onChange={(e) => handleChange('destinations', e.target.value)}
                    id="destinations-input"
                  />
                </div>
                {errors.destinations && <span className="ctp-error">{errors.destinations}</span>}
              </div>

              {/* Dates */}
              <div className="ctp-field-row">
                <div className="ctp-field">
                  <label className="ctp-label">Start Date <span className="ctp-required">*</span></label>
                  <div className={`ctp-input-wrap ${errors.startDate ? 'error' : ''}`}>
                    <i className="bi bi-calendar3 ctp-input-icon"></i>
                    <input type="date" className="ctp-input" value={form.startDate}
                      onChange={(e) => handleChange('startDate', e.target.value)} id="start-date-input" />
                  </div>
                  {errors.startDate && <span className="ctp-error">{errors.startDate}</span>}
                </div>
                <div className="ctp-field">
                  <label className="ctp-label">End Date <span className="ctp-required">*</span></label>
                  <div className={`ctp-input-wrap ${errors.endDate ? 'error' : ''}`}>
                    <i className="bi bi-calendar-check ctp-input-icon"></i>
                    <input type="date" className="ctp-input" value={form.endDate}
                      onChange={(e) => handleChange('endDate', e.target.value)} id="end-date-input" />
                  </div>
                  {errors.endDate && <span className="ctp-error">{errors.endDate}</span>}
                </div>
              </div>

              {/* Duration + Season Info */}
              {tripDuration && (
                <div className="ctp-smart-info fade-in">
                  <span className="ctp-smart-chip"><i className="bi bi-clock me-1"></i>{tripDuration} days trip</span>
                  {travelSeason && <span className="ctp-smart-chip">{travelSeason}</span>}
                </div>
              )}

              {/* Description */}
              <div className="ctp-field">
                <label className="ctp-label">Description</label>
                <div className={`ctp-input-wrap textarea ${form.description ? 'has-value' : ''}`}>
                  <textarea
                    className="ctp-input ctp-textarea"
                    placeholder="Describe your dream journey…"
                    value={form.description}
                    onChange={(e) => handleChange('description', e.target.value)}
                    maxLength={500}
                    rows={3}
                    id="description-input"
                  />
                </div>
                <span className="ctp-char-count">{form.description.length}/500</span>
              </div>

              {/* Category */}
              <div className="ctp-field">
                <label className="ctp-label">Destination Type <span className="ctp-required">*</span></label>
                <div className="ctp-category-grid">
                  {CATEGORIES.map((cat) => (
                    <button
                      type="button"
                      key={cat.value}
                      className={`ctp-cat-btn ${form.category === cat.value ? 'active' : ''}`}
                      onClick={() => handleChange('category', cat.value)}
                      id={`cat-${cat.value.toLowerCase().replace(/\s/g, '-')}`}
                    >
                      <span className="ctp-cat-emoji">{cat.emoji}</span>
                      <span className="ctp-cat-name">{cat.value}</span>
                    </button>
                  ))}
                </div>
                {errors.category && <span className="ctp-error">{errors.category}</span>}
              </div>

              {/* Budget Slider */}
              <div className="ctp-field">
                <label className="ctp-label">
                  Budget Range
                  <span className="ctp-budget-display">{formatBudget(form.budget)}</span>
                </label>
                <div className="ctp-slider-wrap">
                  <input
                    type="range"
                    className="ctp-slider"
                    min={10000}
                    max={500000}
                    step={5000}
                    value={form.budget}
                    onChange={(e) => handleChange('budget', Number(e.target.value))}
                    style={{ '--fill': `${((form.budget - 10000) / (500000 - 10000)) * 100}%` }}
                    id="budget-slider"
                  />
                  <div className="ctp-slider-labels">
                    <span>₹10K</span>
                    <span>₹5L</span>
                  </div>
                </div>
              </div>

              {/* Cover Image Upload */}
              <div className="ctp-field">
                <label className="ctp-label">Cover Photo</label>
                <div className="ctp-upload-area" onClick={() => document.getElementById('cover-upload').click()}>
                  {coverPreview ? (
                    <div className="ctp-upload-preview">
                      <img src={coverPreview} alt="Cover preview" />
                      <button type="button" className="ctp-upload-remove"
                        onClick={(e) => { e.stopPropagation(); setCoverPreview(''); handleChange('coverImage', ''); }}>
                        <i className="bi bi-x-lg"></i>
                      </button>
                    </div>
                  ) : (
                    <div className="ctp-upload-placeholder">
                      <i className="bi bi-cloud-arrow-up"></i>
                      <span>Click or drag to upload</span>
                      <span className="ctp-upload-hint">JPG, PNG up to 5MB</span>
                    </div>
                  )}
                  <input type="file" id="cover-upload" accept="image/*" onChange={handleImageUpload} hidden />
                </div>
              </div>

              {/* Privacy */}
              <div className="ctp-field">
                <label className="ctp-label">Trip Privacy</label>
                <div className="ctp-privacy-options">
                  {PRIVACY_OPTIONS.map((opt) => (
                    <button
                      type="button"
                      key={opt.value}
                      className={`ctp-privacy-btn ${form.privacy === opt.value ? 'active' : ''}`}
                      onClick={() => handleChange('privacy', opt.value)}
                      id={`privacy-${opt.value}`}
                    >
                      <i className={`bi ${opt.icon}`}></i>
                      <div>
                        <span className="ctp-privacy-label">{opt.label}</span>
                        <span className="ctp-privacy-desc">{opt.desc}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="ctp-actions">
                <button type="submit" className="btn-gradient ctp-submit-btn" disabled={loading} id="create-trip-submit">
                  {loading ? (<><span className="spinner"></span>Creating…</>) : (<><i className="bi bi-check-circle me-2"></i>Create Trip</>)}
                </button>
                <button type="button" className="btn-glass ctp-draft-btn" onClick={(e) => handleSubmit(e, true)}
                  disabled={loading} id="save-draft-btn">
                  <i className="bi bi-bookmark me-2"></i>Save as Draft
                </button>
                <button type="button" className="ctp-cancel-btn" onClick={() => navigate('/dashboard')} id="cancel-btn">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
