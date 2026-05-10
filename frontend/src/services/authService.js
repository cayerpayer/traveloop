/* ============================================
   Auth Service — API calls for authentication.
   Currently uses localStorage (mock auth).
   Ready for backend integration.
   ============================================ */

import api from './api';

/**
 * Login user via API.
 * TODO: Replace localStorage auth with this when backend is ready.
 */
export const loginUser = async (email, password) => {
  const response = await api.post('/auth/login', { email, password });
  return response.data;
};

/**
 * Register new user via API.
 */
export const registerUser = async (userData) => {
  const response = await api.post('/auth/register', userData);
  return response.data;
};

/**
 * Get current user profile.
 */
export const getCurrentUser = async () => {
  const response = await api.get('/auth/me');
  return response.data;
};

/**
 * Logout user.
 */
export const logoutUser = async () => {
  const response = await api.post('/auth/logout');
  return response.data;
};

/**
 * Update user profile.
 */
export const updateProfile = async (profileData) => {
  const response = await api.put('/auth/profile', profileData);
  return response.data;
};
