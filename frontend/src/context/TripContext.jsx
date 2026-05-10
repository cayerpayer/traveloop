/* ============================================
   TripContext - user-scoped trip state
   Persists trips per authenticated user.
   ============================================ */

import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { setItem, STORAGE_KEYS } from '../utils/localStorage';
import { useAuth } from './AuthContext';

const TripContext = createContext(null);
const STORAGE_KEY = 'traveloop_trips';

function getStorageKey(userId) {
  return userId ? `${STORAGE_KEY}_${userId}` : null;
}

function loadTrips(storageKey) {
  if (!storageKey) return [];
  try {
    return JSON.parse(localStorage.getItem(storageKey) || '[]');
  } catch {
    return [];
  }
}

export function TripProvider({ children }) {
  const { user, loading: authLoading } = useAuth();
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTripId, setActiveTripIdState] = useState(null);
  const storageKey = getStorageKey(user?.id);
  const resolvedActiveTripId = trips.some((trip) => trip.id === activeTripId) ? activeTripId : trips[0]?.id || null;

  useEffect(() => {
    if (authLoading) return;
    setLoading(true);
    setTrips(loadTrips(storageKey));
    setLoading(false);
  }, [authLoading, storageKey]);

  useEffect(() => {
    if (!storageKey || loading) return;
    localStorage.setItem(storageKey, JSON.stringify(trips));
  }, [trips, storageKey, loading]);

  const setActiveTripId = useCallback((id) => {
    setActiveTripIdState(id);
    setItem(STORAGE_KEYS.ACTIVE_TRIP_ID, id);
  }, []);

  const addTrip = useCallback((tripData) => {
    const newTrip = {
      id: uuidv4(),
      ...tripData,
      userId: user?.id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      destinations: tripData.destinations || [],
      activities: tripData.activities || [],
      status: tripData.status || 'planning',
    };
    setTrips((prev) => [newTrip, ...prev]);
    setActiveTripId(newTrip.id);
    return newTrip;
  }, [setActiveTripId, user?.id]);

  const updateTrip = useCallback((id, updates) => {
    setTrips((prev) => prev.map((trip) => (
      trip.id === id ? { ...trip, ...updates, updatedAt: new Date().toISOString() } : trip
    )));
  }, []);

  const deleteTrip = useCallback((id) => {
    setTrips((prev) => {
      const nextTrips = prev.filter((trip) => trip.id !== id);
      if (resolvedActiveTripId === id) {
        setActiveTripId(nextTrips[0]?.id || null);
      }
      return nextTrips;
    });
  }, [resolvedActiveTripId, setActiveTripId]);

  const getTripById = useCallback((id) => {
    return trips.find((trip) => trip.id === id) || null;
  }, [trips]);

  const getActiveTrip = useCallback(() => {
    return trips.find((trip) => trip.id === resolvedActiveTripId) || trips[0] || null;
  }, [resolvedActiveTripId, trips]);

  const addActivityToTripSummary = useCallback((tripId, activity) => {
    if (!tripId || !activity) return;

    setTrips((prev) => prev.map((trip) => {
      if (trip.id !== tripId) return trip;

      const activities = trip.activities || [];
      const activityDetails = trip.activityDetails || [];
      const hasSummary = activities.some((item) =>
        typeof item === 'string'
          ? item.toLowerCase() === activity.name.toLowerCase()
          : item.id === activity.id
      );
      const hasDetails = activityDetails.some((item) => item.id === activity.id);

      return {
        ...trip,
        activities: hasSummary ? activities : [...activities, activity.name],
        activityDetails: hasDetails ? activityDetails : [...activityDetails, activity],
        updatedAt: new Date().toISOString(),
      };
    }));
  }, []);

  const value = {
    trips,
    loading,
    activeTripId: resolvedActiveTripId,
    activeTrip: getActiveTrip(),
    setActiveTripId,
    addTrip,
    updateTrip,
    deleteTrip,
    getTripById,
    getActiveTrip,
    addActivityToTripSummary,
  };

  return <TripContext.Provider value={value}>{children}</TripContext.Provider>;
}

export function useTrips() {
  const ctx = useContext(TripContext);
  if (!ctx) throw new Error('useTrips must be used inside <TripProvider>');
  return ctx;
}

export default TripContext;
