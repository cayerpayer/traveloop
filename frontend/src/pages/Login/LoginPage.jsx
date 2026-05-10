/* ============================================
   LoginPage — Split layout with premium hero
   + login form, validation, and auth integration.
   ============================================ */

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import HeroSection from '../../components/HeroSection';
import AuthCard from '../../components/AuthCard';
import InputField from '../../components/InputField';
import toast from 'react-hot-toast';
import './LoginPage.css';

// ── Email regex ──
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  // Form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // UI state
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);

  /**
   * Validate form fields.
   */
  const validate = () => {
    const errs = {};
    if (!email.trim()) {
      errs.email = 'Email is required';
    } else if (!EMAIL_REGEX.test(email)) {
      errs.email = 'Please enter a valid email address';
    }
    if (!password) {
      errs.password = 'Password is required';
    } else if (password.length < 6) {
      errs.password = 'Password must be at least 6 characters';
    }
    return errs;
  };

  /**
   * Handle form submission.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');

    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setLoading(true);
    try {
      const result = await login(email, password, remember);
      if (result.success) {
        toast.success(result.message, { icon: '✈️' });
        setTimeout(() => navigate('/dashboard'), 500);
      } else {
        setServerError(result.message);
        toast.error(result.message);
      }
    } catch {
      setServerError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page" id="login-page">
      {/* Left: Hero */}
      <div className="login-hero">
        <HeroSection />
      </div>

      {/* Right: Login Card */}
      <div className="login-form-side">
        {/* Decorative blobs */}
        <div className="login-blob login-blob-1"></div>
        <div className="login-blob login-blob-2"></div>

        <AuthCard
          title="Welcome back"
          subtitle="Sign in to continue your travel planning"
        >
          {/* Server Error */}
          {serverError && (
            <div className="auth-error" id="login-error">
              <i className="bi bi-exclamation-triangle"></i>
              {serverError}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate id="login-form">
            {/* Email */}
            <InputField
              id="login-email"
              label="Email address"
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: '' })); }}
              error={errors.email}
              icon={<i className="bi bi-envelope"></i>}
              placeholder="demo@traveloop.com"
              autoComplete="email"
              required
            />

            {/* Password */}
            <InputField
              id="login-password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => { setPassword(e.target.value); setErrors((p) => ({ ...p, password: '' })); }}
              error={errors.password}
              icon={<i className="bi bi-lock"></i>}
              placeholder="••••••"
              autoComplete="current-password"
              required
              rightElement={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  id="toggle-password"
                >
                  <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                </button>
              }
            />

            {/* Remember & Forgot */}
            <div className="auth-remember">
              <label className="auth-checkbox-label">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  id="remember-me"
                />
                <span className="auth-checkmark"></span>
                Remember me
              </label>
              <button type="button" className="auth-forgot" id="forgot-password">
                Forgot password?
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className={`btn-gradient auth-submit ${loading ? 'auth-submit-loading' : ''}`}
              disabled={loading}
              id="login-submit"
            >
              {loading ? (
                <>
                  <span className="auth-spinner"></span>
                  Signing in…
                </>
              ) : (
                <>
                  Sign In
                  <i className="bi bi-arrow-right ms-2"></i>
                </>
              )}
            </button>
          </form>

          {/* Security badge */}
          <div className="auth-security-badge">
            <i className="bi bi-shield-lock-fill"></i>
            <span>256-bit SSL encrypted connection</span>
          </div>

          {/* Footer */}
          <div className="auth-footer" id="login-footer">
            Don't have an account?{' '}
            <Link to="/signup">Create one</Link>
          </div>
        </AuthCard>
      </div>
    </div>
  );
}
