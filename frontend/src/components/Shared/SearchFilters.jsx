/* ============================================
   SearchFilters — Reusable search + filter bar
   ============================================ */
import { useState } from 'react';
import './SearchFilters.css';

export default function SearchFilters({ placeholder = 'Search...', filters = [], onSearch, onFilter, value = '' }) {
  const [activeFilter, setActiveFilter] = useState('All');

  const handleFilter = (f) => {
    setActiveFilter(f);
    onFilter && onFilter(f);
  };

  return (
    <div className="search-filters-bar fade-in-up">
      <div className="sf-search-wrap">
        <i className="bi bi-search sf-search-icon"></i>
        <input
          type="text"
          className="sf-search-input"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onSearch && onSearch(e.target.value)}
        />
        {value && (
          <button className="sf-clear-btn" onClick={() => onSearch && onSearch('')}>
            <i className="bi bi-x-lg"></i>
          </button>
        )}
      </div>
      {filters.length > 0 && (
        <div className="sf-filters">
          {['All', ...filters].map((f) => (
            <button
              key={f}
              className={`sf-filter-chip ${activeFilter === f ? 'active' : ''}`}
              onClick={() => handleFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
