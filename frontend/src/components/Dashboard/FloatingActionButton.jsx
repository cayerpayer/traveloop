/* ============================================
   FloatingActionButton — Expandable FAB with
   quick travel action menu.
   ============================================ */

import { useState } from 'react';
import './FloatingActionButton.css';

const FAB_ACTIONS = [
  { icon: 'bi-airplane', label: 'New Trip', color: '#4F46E5' },
  { icon: 'bi-wallet2', label: 'Budget', color: '#10B981' },
  { icon: 'bi-compass', label: 'Explore', color: '#06B6D4' },
  { icon: 'bi-people', label: 'Invite', color: '#F59E0B' },
];

export default function FloatingActionButton() {
  const [open, setOpen] = useState(false);

  return (
    <div className={`fab-container ${open ? 'open' : ''}`} id="fab-container">
      {/* Mini Actions */}
      <div className="fab-actions">
        {FAB_ACTIONS.map((action, i) => (
          <button
            key={action.label}
            className="fab-mini"
            style={{
              background: action.color,
              transitionDelay: open ? `${i * 0.06}s` : '0s',
            }}
            title={action.label}
            id={`fab-action-${i}`}
          >
            <i className={`bi ${action.icon}`}></i>
            <span className="fab-mini-label">{action.label}</span>
          </button>
        ))}
      </div>

      {/* Main Button */}
      <button
        className="fab-main"
        onClick={() => setOpen(!open)}
        id="fab-main-btn"
        aria-label="Quick actions"
      >
        <i className={`bi ${open ? 'bi-x-lg' : 'bi-plus-lg'}`}></i>
      </button>
    </div>
  );
}
