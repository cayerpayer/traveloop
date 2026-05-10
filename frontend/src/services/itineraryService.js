/* ============================================
   Itinerary Service — API calls for itinerary
   builder and viewer functionality.
   Currently uses localStorage.
   Ready for backend integration.
   ============================================ */

import api from './api';

/**
 * Get itinerary for a trip.
 */
export const getItinerary = async (tripId) => {
  const response = await api.get(`/itineraries/${tripId}`);
  return response.data;
};

/**
 * Save/update itinerary for a trip.
 */
export const saveItinerary = async (tripId, itineraryData) => {
  const response = await api.put(`/itineraries/${tripId}`, itineraryData);
  return response.data;
};

/**
 * Get shared itinerary (public).
 */
export const getSharedItinerary = async (shareId) => {
  const response = await api.get(`/itineraries/shared/${shareId}`);
  return response.data;
};

/**
 * Generate share link for itinerary.
 */
export const shareItinerary = async (tripId) => {
  const response = await api.post(`/itineraries/${tripId}/share`);
  return response.data;
};

/**
 * Add activity to itinerary day.
 */
export const addActivity = async (tripId, dayIndex, activity) => {
  const response = await api.post(`/itineraries/${tripId}/days/${dayIndex}/activities`, activity);
  return response.data;
};

/**
 * Remove activity from itinerary day.
 */
export const removeActivity = async (tripId, dayIndex, activityId) => {
  const response = await api.delete(`/itineraries/${tripId}/days/${dayIndex}/activities/${activityId}`);
  return response.data;
};
