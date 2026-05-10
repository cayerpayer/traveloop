/* ============================================
   TripContext — Trip State Management
   Handles CRUD for trips with localStorage.
   ============================================ */

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { getItem, setItem, STORAGE_KEYS } from '../utils/localStorage';

const TripContext = createContext(null);
const STORAGE_KEY = 'traveloop_trips';

// Seed data for first-time users
const SEED_TRIPS = [
  {
    id: uuidv4(),
    tripName: 'Bali Escape',
    startDate: '2026-06-15',
    endDate: '2026-06-22',
    description: 'A week of tropical adventure exploring temples, beaches, and rice terraces in beautiful Bali.',
    category: 'Beach',
    budget: 280000,
    coverImage: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&h=500&fit=crop',
    privacy: 'shared',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    destinations: ['Ubud', 'Seminyak', 'Nusa Penida'],
    activities: ['Surfing', 'Temple Visit', 'Rice Terrace Trek'],
    status: 'upcoming',
  },
  {
    id: uuidv4(),
    tripName: 'Europe Backpacking',
    startDate: '2026-08-03',
    endDate: '2026-08-18',
    description: 'An epic 15-day backpacking journey through Paris, Rome, and Barcelona experiencing European culture.',
    category: 'Backpacking',
    budget: 550000,
    coverImage: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&h=500&fit=crop',
    privacy: 'private',
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    destinations: ['Paris', 'Rome', 'Barcelona'],
    activities: ['Museum Tours', 'Food Walks', 'Photography'],
    status: 'planning',
  },
  {
    id: uuidv4(),
    tripName: 'Dubai Luxury Tour',
    startDate: '2026-10-10',
    endDate: '2026-10-16',
    description: 'A luxurious experience in Dubai — desert safaris, skyline views, and world-class dining.',
    category: 'Luxury',
    budget: 420000,
    coverImage: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=500&fit=crop',
    privacy: 'public',
    createdAt: new Date(Date.now() - 86400000 * 10).toISOString(),
    destinations: ['Dubai Marina', 'Burj Khalifa', 'Desert Safari'],
    activities: ['Skydiving', 'Desert Safari', 'Fine Dining'],
    status: 'draft',
  },
];

function loadTrips() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
    // Seed on first load
    localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_TRIPS));
    return SEED_TRIPS;
  } catch {
    return SEED_TRIPS;
  }
}

export function TripProvider({ children }) {
  const [trips, setTrips] = useState(() => loadTrips());
  const [activeTripId, setActiveTripIdState] = useState(() => getItem(STORAGE_KEYS.ACTIVE_TRIP_ID, null));
  const resolvedActiveTripId = trips.some((trip) => trip.id === activeTripId) ? activeTripId : trips[0]?.id || null;

  // Persist to localStorage on every change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trips));
  }, [trips]);

  const setActiveTripId = useCallback((id) => {
    setActiveTripIdState(id);
    setItem(STORAGE_KEYS.ACTIVE_TRIP_ID, id);
  }, []);

  const addTrip = useCallback((tripData) => {
    const newTrip = {
      id: uuidv4(),
      ...tripData,
      createdAt: new Date().toISOString(),
      destinations: tripData.destinations || [],
      activities: tripData.activities || [],
      status: tripData.status || 'planning',
    };
    setTrips((prev) => [newTrip, ...prev]);
    setActiveTripId(newTrip.id);
    return newTrip;
  }, [setActiveTripId]);

  const updateTrip = useCallback((id, updates) => {
    setTrips((prev) => prev.map((t) => (t.id === id ? { ...t, ...updates } : t)));
  }, []);

  const deleteTrip = useCallback((id) => {
    const nextTrips = trips.filter((t) => t.id !== id);
    setTrips(nextTrips);

    if (resolvedActiveTripId === id) {
      setActiveTripId(nextTrips[0]?.id || null);
    }
  }, [resolvedActiveTripId, setActiveTripId, trips]);

  const getTripById = useCallback((id) => {
    return trips.find((t) => t.id === id) || null;
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
      };
    }));
  }, []);

  const value = {
    trips,
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
