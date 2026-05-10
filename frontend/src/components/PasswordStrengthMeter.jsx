/* ============================================
   PasswordStrengthMeter — Visual indicator
   for password strength with animated bars.
   ============================================ */

import './PasswordStrengthMeter.css';

/**
 * Calculate password strength (0–4).
 */
function getStrength(password) {
  let score = 0;
  if (!password) return score;
  if (password.length >= 6) score++;
  if (password.length >= 10) score++;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return Math.min(score, 4);
}

const LEVELS = [
  { label: '', color: 'transparent' },
  { label: 'Weak', color: '#EF4444' },
  { label: 'Fair', color: '#F59E0B' },
  { label: 'Good', color: '#3B82F6' },
  { label: 'Strong', color: '#10B981' },
];

export default function PasswordStrengthMeter({ password }) {
  const strength = getStrength(password);
  const level = LEVELS[strength];

  if (!password) return null;

  return (
    <div className="password-strength" id="password-strength-meter">
      {/* Bars */}
      <div className="strength-bars">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`strength-bar ${strength >= i ? 'active' : ''}`}
            style={{ backgroundColor: strength >= i ? level.color : undefined }}
          />
        ))}
      </div>
      {/* Label */}
      <span className="strength-label" style={{ color: level.color }}>
        {level.label}
      </span>
    </div>
  );
}
