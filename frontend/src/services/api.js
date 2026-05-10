/* ============================================
   API Client — Axios instance configured for
   the Traveloop backend API.
   ============================================ */

import axios from 'axios';

const configuredApiUrl = import.meta.env.VITE_API_URL?.trim();
const API_URL =
  configuredApiUrl || (import.meta.env.DEV ? 'http://localhost:5000/api' : '');

if (!API_URL) {
  throw new Error('Missing VITE_API_URL. Set it to the deployed backend API URL.');
}

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// ── Request Interceptor: Attach JWT token ──
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('traveloop_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ── Response Interceptor: Handle auth errors ──
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('traveloop_token');
      localStorage.removeItem('traveloop_user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
