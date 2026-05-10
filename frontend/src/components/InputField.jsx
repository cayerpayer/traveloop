/* ============================================
   InputField — Reusable form input with
   floating label, icons, and validation state.
   ============================================ */

import { useState } from 'react';
import './InputField.css';

export default function InputField({
  id,
  label,
  type = 'text',
  value,
  onChange,
  error,
  icon,
  placeholder,
  autoComplete,
  required = false,
  disabled = false,
  rightElement,
}) {
  const [focused, setFocused] = useState(false);

  const hasValue = value && value.length > 0;

  return (
    <div className={`input-field-wrapper ${focused ? 'focused' : ''} ${error ? 'has-error' : ''} ${hasValue ? 'has-value' : ''}`}>
      {/* Icon */}
      {icon && <span className="input-icon">{icon}</span>}

      {/* Input */}
      <input
        id={id}
        type={type}
        className="input-field"
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={focused || hasValue ? placeholder : ' '}
        autoComplete={autoComplete}
        required={required}
        disabled={disabled}
      />

      {/* Floating Label */}
      <label htmlFor={id} className="input-label">{label}</label>

      {/* Right Element (e.g., show/hide password toggle) */}
      {rightElement && <span className="input-right">{rightElement}</span>}

      {/* Bottom highlight line */}
      <span className="input-highlight"></span>

      {/* Error Message */}
      {error && (
        <span className="input-error fade-in">
          <i className="bi bi-exclamation-circle me-1"></i>
          {error}
        </span>
      )}
    </div>
  );
}
