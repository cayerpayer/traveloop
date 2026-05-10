/* ============================================
   Trip Service — API calls for trip management.
   Currently uses localStorage via TripContext.
   Ready for backend integration.
   ============================================ */

import api from './api';

/**
 * Get all trips for the current user.
 */
export const getTrips = async () => {
  const response = await api.get('/trips');
  return response.data;
};

/**
 * Get a single trip by ID.
 */
export const getTrip = async (tripId) => {
  const response = await api.get(`/trips/${tripId}`);
  return response.data;
};

/**
 * Create a new trip.
 */
export const createTrip = async (tripData) => {
  const response = await api.post('/trips', tripData);
  return response.data;
};

/**
 * Update an existing trip.
 */
export const updateTrip = async (tripId, tripData) => {
  const response = await api.put(`/trips/${tripId}`, tripData);
  return response.data;
};

/**
 * Delete a trip.
 */
export const deleteTrip = async (tripId) => {
  const response = await api.delete(`/trips/${tripId}`);
  return response.data;
};

/**
 * Get trip packing list.
 */
export const getPackingList = async (tripId) => {
  const response = await api.get(`/trips/${tripId}/packing`);
  return response.data;
};

/**
 * Update trip packing list.
 */
export const updatePackingList = async (tripId, items) => {
  const response = await api.put(`/trips/${tripId}/packing`, { items });
  return response.data;
};
