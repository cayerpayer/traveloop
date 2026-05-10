/* ============================================
   TripContext - user-scoped trip state
   Persists trips per authenticated user.
   ============================================ */

import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
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
  const storageKey = getStorageKey(user?.id);

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
    return newTrip;
  }, [user?.id]);

  const updateTrip = useCallback((id, updates) => {
    setTrips((prev) => prev.map((trip) => (
      trip.id === id ? { ...trip, ...updates, updatedAt: new Date().toISOString() } : trip
    )));
  }, []);

  const deleteTrip = useCallback((id) => {
    setTrips((prev) => prev.filter((trip) => trip.id !== id));
  }, []);

  const getTripById = useCallback((id) => {
    return trips.find((trip) => trip.id === id) || null;
  }, [trips]);

  const value = { trips, loading, addTrip, updateTrip, deleteTrip, getTripById };

  return <TripContext.Provider value={value}>{children}</TripContext.Provider>;
}

export function useTrips() {
  const ctx = useContext(TripContext);
  if (!ctx) throw new Error('useTrips must be used inside <TripProvider>');
  return ctx;
}

export default TripContext;
