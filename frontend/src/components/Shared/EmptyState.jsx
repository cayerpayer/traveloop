/* ============================================
   EmptyState — Beautiful placeholder for empty lists
   ============================================ */
import './EmptyState.css';

export default function EmptyState({ icon = 'bi-inbox', title = 'Nothing here yet', message = '', action, actionLabel }) {
  return (
    <div className="empty-state fade-in-up">
      <div className="empty-state-icon">
        <i className={`bi ${icon}`}></i>
      </div>
      <h3 className="empty-state-title">{title}</h3>
      {message && <p className="empty-state-msg">{message}</p>}
      {action && (
        <button className="btn-gradient mt-3" onClick={action}>
          {actionLabel || 'Get Started'}
        </button>
      )}
    </div>
  );
}
