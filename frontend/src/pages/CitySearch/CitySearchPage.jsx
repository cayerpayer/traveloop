/* ============================================
   CitySearchPage — Destination discovery
   ============================================ */
import { useState, useMemo } from 'react';
import DashboardNavbar from '../../components/Dashboard/DashboardNavbar';
import SearchFilters from '../../components/Shared/SearchFilters';
import EmptyState from '../../components/Shared/EmptyState';
import { CITIES_DATA } from '../../data/mockData';
import { getItem, setItem, STORAGE_KEYS } from '../../utils/localStorage';
import toast from 'react-hot-toast';
import './CitySearchPage.css';

const REGIONS = ['Asia', 'Europe', 'Middle East'];
const CLIMATES = ['Tropical', 'Temperate', 'Arid', 'Mediterranean'];

export default function CitySearchPage() {
  const [query, setQuery] = useState('');
  const [regionFilter, setRegionFilter] = useState('All');
  const [saved, setSaved] = useState(() => getItem(STORAGE_KEYS.SAVED_CITIES, []));
  const [compareList, setCompareList] = useState([]);
  const [showCompare, setShowCompare] = useState(false);

  const filtered = useMemo(() => {
    let list = CITIES_DATA;
    if (query) list = list.filter(c => c.name.toLowerCase().includes(query.toLowerCase()) || c.country.toLowerCase().includes(query.toLowerCase()));
    if (regionFilter !== 'All') list = list.filter(c => c.region === regionFilter);
    return list;
  }, [query, regionFilter]);

  const toggleSave = (cityId) => {
    const next = saved.includes(cityId) ? saved.filter(id => id !== cityId) : [...saved, cityId];
    setSaved(next);
    setItem(STORAGE_KEYS.SAVED_CITIES, next);
    toast.success(next.includes(cityId) ? 'Destination saved!' : 'Removed from saved');
  };

  const toggleCompare = (cityId) => {
    if (compareList.includes(cityId)) {
      setCompareList(compareList.filter(id => id !== cityId));
    } else if (compareList.length < 3) {
      setCompareList([...compareList, cityId]);
    } else {
      toast.error('Compare up to 3 destinations');
    }
  };

  const comparedCities = CITIES_DATA.filter(c => compareList.includes(c.id));

  return (
    <div className="city-search-page">
      <div className="animated-bg"></div>
      <DashboardNavbar />
      <main className="container city-search-main">
        <div className="cs-header fade-in-up">
          <h1 className="cs-title">Discover <span className="gradient-text">Destinations</span></h1>
          <p className="cs-subtitle">Explore trending destinations and plan your next adventure</p>
        </div>

        {/* Trending Carousel */}
        <div className="cs-trending fade-in-up delay-1">
          <h3 className="cs-section-title"><i className="bi bi-fire me-2"></i>Trending Now</h3>
          <div className="cs-trending-scroll">
            {CITIES_DATA.slice(0, 5).map((city) => (
              <div key={city.id} className="cs-trend-card" onClick={() => setQuery(city.name)}>
                <img src={city.image} alt={city.name} className="cs-trend-img" loading="lazy" />
                <div className="cs-trend-overlay">
                  <span className="cs-trend-flag">{city.countryFlag}</span>
                  <span className="cs-trend-name">{city.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <SearchFilters
          placeholder="Search cities, countries..."
          filters={REGIONS}
          value={query}
          onSearch={setQuery}
          onFilter={setRegionFilter}
        />

        {compareList.length > 0 && (
          <div className="cs-compare-bar fade-in">
            <span>{compareList.length} selected</span>
            <button className="btn-gradient btn-sm" onClick={() => setShowCompare(true)}>
              <i className="bi bi-layout-three-columns me-1"></i>Compare
            </button>
            <button className="btn-glass btn-sm" onClick={() => setCompareList([])}>Clear</button>
          </div>
        )}

        {filtered.length === 0 ? (
          <EmptyState icon="bi-globe" title="No destinations found" message="Try a different search term" />
        ) : (
          <div className="cs-grid">
            {filtered.map((city, i) => (
              <div key={city.id} className="cs-city-card fade-in-up" style={{ animationDelay: `${0.1 + i * 0.08}s` }}>
                <div className="cs-card-img-wrap">
                  <img src={city.image} alt={city.name} className="cs-card-img" loading="lazy" />
                  <div className="cs-card-img-overlay"></div>
                  <span className="cs-card-flag">{city.countryFlag}</span>
                  <div className="cs-card-actions-top">
                    <button className={`cs-save-btn ${saved.includes(city.id) ? 'saved' : ''}`} onClick={(e) => { e.stopPropagation(); toggleSave(city.id); }}>
                      <i className={`bi ${saved.includes(city.id) ? 'bi-heart-fill' : 'bi-heart'}`}></i>
                    </button>
                    <button className={`cs-compare-btn ${compareList.includes(city.id) ? 'active' : ''}`} onClick={(e) => { e.stopPropagation(); toggleCompare(city.id); }}>
                      <i className="bi bi-layout-three-columns"></i>
                    </button>
                  </div>
                </div>
                <div className="cs-card-body">
                  <div className="cs-card-header-row">
                    <h3 className="cs-card-name">{city.name}</h3>
                    <span className="cs-card-cost">{city.costIndex}</span>
                  </div>
                  <p className="cs-card-country"><i className="bi bi-geo-alt me-1"></i>{city.country}</p>
                  <p className="cs-card-desc">{city.description}</p>
                  <div className="cs-card-stats">
                    <div className="cs-stat">
                      <i className={`bi ${city.weather.icon}`}></i>
                      <span>{city.weather.temp}</span>
                    </div>
                    <div className="cs-stat">
                      <i className="bi bi-star-fill"></i>
                      <span>{city.popularityScore}%</span>
                    </div>
                    <div className="cs-stat">
                      <i className="bi bi-wallet2"></i>
                      <span>${city.dailyBudget}/day</span>
                    </div>
                    <div className="cs-stat">
                      <i className="bi bi-calendar-check"></i>
                      <span>{city.bestSeason}</span>
                    </div>
                  </div>
                  <div className="cs-card-tags">
                    {city.tags.map(t => <span key={t} className="cs-tag">{t}</span>)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Compare Modal */}
        {showCompare && (
          <div className="cs-modal-overlay" onClick={() => setShowCompare(false)}>
            <div className="cs-compare-modal fade-in-up" onClick={e => e.stopPropagation()}>
              <div className="cs-modal-header">
                <h3>Compare Destinations</h3>
                <button onClick={() => setShowCompare(false)}><i className="bi bi-x-lg"></i></button>
              </div>
              <div className="cs-compare-grid">
                {comparedCities.map(c => (
                  <div key={c.id} className="cs-compare-col">
                    <img src={c.image} alt={c.name} className="cs-compare-img" />
                    <h4>{c.countryFlag} {c.name}</h4>
                    <div className="cs-compare-rows">
                      <div className="cs-compare-row"><span>Daily Budget</span><strong>${c.dailyBudget}</strong></div>
                      <div className="cs-compare-row"><span>Popularity</span><strong>{c.popularityScore}%</strong></div>
                      <div className="cs-compare-row"><span>Best Season</span><strong>{c.bestSeason}</strong></div>
                      <div className="cs-compare-row"><span>Climate</span><strong>{c.climate}</strong></div>
                      <div className="cs-compare-row"><span>Cost Level</span><strong>{c.costIndex}</strong></div>
                    </div>
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
