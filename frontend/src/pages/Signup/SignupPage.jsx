/* ============================================
   SignupPage — Registration form with password
   strength, live validation, and terms checkbox.
   ============================================ */

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import HeroSection from '../../components/HeroSection';
import AuthCard from '../../components/AuthCard';
import InputField from '../../components/InputField';
import PasswordStrengthMeter from '../../components/PasswordStrengthMeter';
import toast from 'react-hot-toast';
import './SignupPage.css';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function SignupPage() {
  const { signup } = useAuth();
  const navigate = useNavigate();

  // Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // UI state
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  /**
   * Validate all fields.
   */
  const validate = () => {
    const errs = {};
    if (!name.trim()) {
      errs.name = 'Full name is required';
    } else if (name.trim().length < 2) {
      errs.name = 'Name must be at least 2 characters';
    }
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
    if (!confirmPassword) {
      errs.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      errs.confirmPassword = 'Passwords do not match';
    }
    if (!agreeTerms) {
      errs.terms = 'You must agree to the Terms & Conditions';
    }
    return errs;
  };

  /**
   * Handle form submission.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');
    setSuccess('');

    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setLoading(true);
    try {
      const result = await signup(name.trim(), email.trim(), password);
      if (result.success) {
        setSuccess(result.message);
        toast.success('Account created successfully!', { icon: '🎉' });
        setTimeout(() => navigate('/login'), 2000);
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
    <div className="signup-page" id="signup-page">
      {/* Left: Hero */}
      <div className="signup-hero">
        <HeroSection />
      </div>

      {/* Right: Signup Card */}
      <div className="signup-form-side">
        <AuthCard
          title="Create your account"
          subtitle="Start planning your next adventure today"
        >
          {/* Server Error */}
          {serverError && (
            <div className="auth-error" id="signup-error">
              <i className="bi bi-exclamation-triangle"></i>
              {serverError}
            </div>
          )}

          {/* Success */}
          {success && (
            <div className="auth-success" id="signup-success">
              <i className="bi bi-check-circle"></i>
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate id="signup-form">
            {/* Full Name */}
            <InputField
              id="signup-name"
              label="Full Name"
              type="text"
              value={name}
              onChange={(e) => { setName(e.target.value); setErrors((p) => ({ ...p, name: '' })); }}
              error={errors.name}
              icon={<i className="bi bi-person"></i>}
              placeholder="John Doe"
              autoComplete="name"
              required
            />

            {/* Email */}
            <InputField
              id="signup-email"
              label="Email address"
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: '' })); }}
              error={errors.email}
              icon={<i className="bi bi-envelope"></i>}
              placeholder="you@example.com"
              autoComplete="email"
              required
            />

            {/* Password */}
            <InputField
              id="signup-password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => { setPassword(e.target.value); setErrors((p) => ({ ...p, password: '' })); }}
              error={errors.password}
              icon={<i className="bi bi-lock"></i>}
              placeholder="Min 6 characters"
              autoComplete="new-password"
              required
              rightElement={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  id="toggle-signup-password"
                >
                  <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                </button>
              }
            />

            {/* Password Strength */}
            <PasswordStrengthMeter password={password} />

            {/* Confirm Password */}
            <InputField
              id="signup-confirm-password"
              label="Confirm Password"
              type={showConfirm ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => { setConfirmPassword(e.target.value); setErrors((p) => ({ ...p, confirmPassword: '' })); }}
              error={errors.confirmPassword}
              icon={<i className="bi bi-shield-lock"></i>}
              placeholder="Re-enter password"
              autoComplete="new-password"
              required
              rightElement={
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  aria-label={showConfirm ? 'Hide password' : 'Show password'}
                  id="toggle-confirm-password"
                >
                  <i className={`bi ${showConfirm ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                </button>
              }
            />

            {/* Terms */}
            <div className="auth-terms">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => { setAgreeTerms(e.target.checked); setErrors((p) => ({ ...p, terms: '' })); }}
                id="agree-terms"
              />
              <span>
                I agree to the{' '}
                <a href="#" onClick={(e) => e.preventDefault()}>Terms of Service</a>{' '}
                and{' '}
                <a href="#" onClick={(e) => e.preventDefault()}>Privacy Policy</a>
              </span>
            </div>
            {errors.terms && (
              <div className="auth-error" style={{ marginTop: '-0.75rem' }}>
                <i className="bi bi-exclamation-triangle"></i>
                {errors.terms}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              className="btn-gradient auth-submit"
              disabled={loading}
              id="signup-submit"
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Creating account…
                </>
              ) : (
                <>
                  <i className="bi bi-person-plus"></i>
                  Create Account
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="auth-divider">
            <span>or</span>
          </div>

          {/* Google Button */}
          <button className="btn-google" id="google-signup">
            <svg viewBox="0 0 24 24" width="20" height="20">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          {/* Footer */}
          <div className="auth-footer" id="signup-footer">
            Already have an account?{' '}
            <Link to="/login">Sign in</Link>
          </div>
        </AuthCard>
      </div>
    </div>
  );
}
