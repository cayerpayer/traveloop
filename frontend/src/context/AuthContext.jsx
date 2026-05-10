/* ============================================
   AuthContext — Authentication State Management
   Handles login, signup, logout, and session
   persistence via localStorage.
   ============================================ */

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';

const AuthContext = createContext(null);

// ── Storage Keys ──
const STORAGE_KEYS = {
  USER: 'traveloop_user',
  USERS_DB: 'traveloop_users_db',
  REMEMBER: 'traveloop_remember',
};

/**
 * Seeds the demo user into localStorage if not present.
 */
function seedDemoUser() {
  const db = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS_DB) || '[]');
  const demoExists = db.some((u) => u.email === 'demo@traveloop.com');
  if (!demoExists) {
    db.push({
      id: uuidv4(),
      name: 'Demo User',
      email: 'demo@traveloop.com',
      password: '123456',
      token: uuidv4(),
      createdAt: new Date().toISOString(),
    });
    localStorage.setItem(STORAGE_KEYS.USERS_DB, JSON.stringify(db));
  }
}

/**
 * AuthProvider — wraps the app and provides auth state + actions.
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ── On mount: seed demo user & restore session ──
  useEffect(() => {
    seedDemoUser();
    const stored = localStorage.getItem(STORAGE_KEYS.USER);
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem(STORAGE_KEYS.USER);
      }
    }
    setLoading(false);
  }, []);

  /**
   * login — validates credentials against localStorage "DB".
   * Returns { success, message }.
   */
  const login = useCallback(async (email, password, remember = false) => {
    // Simulate network latency for realism
    await new Promise((r) => setTimeout(r, 1200));

    const db = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS_DB) || '[]');
    const found = db.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (!found) {
      return { success: false, message: 'Invalid email or password. Please try again.' };
    }

    const userObj = {
      id: found.id,
      name: found.name,
      email: found.email,
      token: uuidv4(), // refresh token on each login
      createdAt: found.createdAt,
    };

    setUser(userObj);
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userObj));
    if (remember) {
      localStorage.setItem(STORAGE_KEYS.REMEMBER, 'true');
    }
    return { success: true, message: 'Welcome back! Redirecting…' };
  }, []);

  /**
   * signup — registers a new user in localStorage "DB".
   * Returns { success, message }.
   */
  const signup = useCallback(async (name, email, password) => {
    await new Promise((r) => setTimeout(r, 1200));

    const db = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS_DB) || '[]');
    const exists = db.some((u) => u.email.toLowerCase() === email.toLowerCase());

    if (exists) {
      return { success: false, message: 'An account with this email already exists.' };
    }

    const newUser = {
      id: uuidv4(),
      name,
      email: email.toLowerCase(),
      password,
      token: uuidv4(),
      createdAt: new Date().toISOString(),
    };

    db.push(newUser);
    localStorage.setItem(STORAGE_KEYS.USERS_DB, JSON.stringify(db));

    return { success: true, message: 'Account created! Redirecting to login…' };
  }, []);

  /**
   * logout — clears session and user state.
   */
  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEYS.USER);
    localStorage.removeItem(STORAGE_KEYS.REMEMBER);
  }, []);

  /**
   * updatePassword — updates user password
   */
  const updatePassword = useCallback(async (oldPassword, newPassword) => {
    await new Promise((r) => setTimeout(r, 800));

    if (!user) {
      return { success: false, message: 'Not authenticated' };
    }

    const db = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS_DB) || '[]');
    const userRecord = db.find((u) => u.id === user.id);

    if (!userRecord) {
      return { success: false, message: 'User not found' };
    }

    if (userRecord.password !== oldPassword) {
      return { success: false, message: 'Current password is incorrect' };
    }

    userRecord.password = newPassword;
    localStorage.setItem(STORAGE_KEYS.USERS_DB, JSON.stringify(db));

    return { success: true, message: 'Password updated successfully' };
  }, [user]);

  /**
   * deleteAccount — permanently deletes user account and all data
   */
  const deleteAccount = useCallback(async () => {
    await new Promise((r) => setTimeout(r, 800));

    if (!user) {
      return { success: false, message: 'Not authenticated' };
    }

    // Remove user from database
    const db = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS_DB) || '[]');
    const filtered = db.filter((u) => u.id !== user.id);
    localStorage.setItem(STORAGE_KEYS.USERS_DB, JSON.stringify(filtered));

    // Remove user trips
    const storageKey = `traveloop_trips_${user.id}`;
    localStorage.removeItem(storageKey);

    // Remove user profile
    const profileKey = `traveloop_profile_${user.id}`;
    localStorage.removeItem(profileKey);

    // Clear user session
    setUser(null);
    localStorage.removeItem(STORAGE_KEYS.USER);
    localStorage.removeItem(STORAGE_KEYS.REMEMBER);

    return { success: true, message: 'Account deleted successfully' };
  }, [user]);

  const value = { user, loading, login, signup, logout, updatePassword, deleteAccount };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * useAuth — hook to consume AuthContext.
 */
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}

export default AuthContext;
