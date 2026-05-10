/* ============================================
   LoadingSkeleton — Animated skeleton loader
   ============================================ */
import './LoadingSkeleton.css';

export default function LoadingSkeleton({ count = 3, type = 'card' }) {
  return (
    <div className={`skeleton-grid skeleton-${type}`}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="skeleton-item">
          {type === 'card' && <div className="skeleton-image shimmer" />}
          <div className="skeleton-body">
            <div className="skeleton-line lg shimmer" />
            <div className="skeleton-line md shimmer" />
            <div className="skeleton-line sm shimmer" />
          </div>
        </div>
      ))}
    </div>
  );
}
