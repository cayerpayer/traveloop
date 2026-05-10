/* ============================================
   Itinerary Storage Helpers
   Shared localStorage persistence for planner,
   activities, trip details, and budget views.
   ============================================ */

import { v4 as uuidv4 } from 'uuid';
import { getItem, setItem, STORAGE_KEYS } from './localStorage';

export const ITINERARY_SLOTS = ['Morning', 'Afternoon', 'Evening'];
export const DEFAULT_SLOT = 'Morning';

export function buildItineraryDays(count = 1) {
  return Array.from({ length: Math.max(1, count) }, (_, i) => ({
    id: uuidv4(),
    day: i + 1,
    slots: { Morning: [], Afternoon: [], Evening: [] },
    notes: '',
  }));
}

export function getTripDurationDays(trip) {
  if (!trip?.startDate || !trip?.endDate) return 1;

  const start = new Date(trip.startDate);
  const end = new Date(trip.endDate);
  const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
  return Number.isFinite(diff) && diff > 0 ? diff : 1;
}

export function getItineraries() {
  return getItem(STORAGE_KEYS.ITINERARIES, []);
}

export function saveItineraryRecord(updated) {
  const all = getItineraries();
  const idx = all.findIndex((itinerary) => itinerary.id === updated.id);
  const next = idx >= 0 ? all.map((itinerary, i) => (i === idx ? updated : itinerary)) : [updated, ...all];

  setItem(STORAGE_KEYS.ITINERARIES, next);
  return updated;
}

export function createItineraryForTrip(trip) {
  const totalDays = getTripDurationDays(trip);
  const destinations = trip?.destinations?.length ? trip.destinations : ['Bali'];

  return {
    id: uuidv4(),
    tripId: trip?.id || null,
    title: trip?.tripName || 'My Trip',
    cities: destinations,
    days: buildItineraryDays(totalDays),
    budget: trip?.budget || 3000,
    totalDays,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

export function getItineraryForTripId(tripId) {
  if (!tripId) return null;
  return getItineraries().find((itinerary) => itinerary.tripId === tripId) || null;
}

export function getOrCreateItineraryForTrip(trip) {
  if (!trip) return null;

  const existing = getItineraryForTripId(trip.id);
  if (existing) return existing;

  return saveItineraryRecord(createItineraryForTrip(trip));
}

export function getActivityIdsForItinerary(itinerary) {
  if (!itinerary?.days) return [];

  return itinerary.days.flatMap((day) =>
    Object.values(day.slots || {}).flat().map((activity) => activity.id)
  );
}

export function getItineraryActivityCost(itinerary) {
  if (!itinerary?.days) return 0;

  return itinerary.days.reduce(
    (total, day) =>
      total +
      Object.values(day.slots || {}).reduce(
        (slotTotal, activities) =>
          slotTotal + activities.reduce((activityTotal, activity) => activityTotal + (Number(activity.cost) || 0), 0),
        0
      ),
    0
  );
}

export function getDailyActivityCosts(itinerary) {
  if (!itinerary?.days) return [];

  return itinerary.days.map((day) => ({
    day: `Day ${day.day}`,
    activities: Object.values(day.slots || {}).reduce(
      (slotTotal, activities) =>
        slotTotal + activities.reduce((activityTotal, activity) => activityTotal + (Number(activity.cost) || 0), 0),
      0
    ),
  }));
}

export function addActivityToTripItinerary({ trip, activity, dayNum = 1, slot = DEFAULT_SLOT }) {
  const itinerary = getOrCreateItineraryForTrip(trip);
  if (!itinerary) {
    return { added: false, reason: 'no-trip', itinerary: null };
  }

  const allActivityIds = getActivityIdsForItinerary(itinerary);
  if (allActivityIds.includes(activity.id)) {
    return { added: false, reason: 'duplicate', itinerary };
  }

  const normalizedSlot = ITINERARY_SLOTS.includes(slot) ? slot : DEFAULT_SLOT;
  const normalizedActivity = {
    ...activity,
    slotId: uuidv4(),
    addedAt: new Date().toISOString(),
  };

  const hasDay = itinerary.days.some((day) => day.day === dayNum);
  const targetDay = hasDay ? dayNum : itinerary.days[0]?.day || 1;

  const updated = {
    ...itinerary,
    updatedAt: new Date().toISOString(),
    days: itinerary.days.map((day) => {
      if (day.day !== targetDay) return day;

      return {
        ...day,
        slots: {
          ...day.slots,
          [normalizedSlot]: [...(day.slots?.[normalizedSlot] || []), normalizedActivity],
        },
      };
    }),
  };

  saveItineraryRecord(updated);
  return { added: true, activity: normalizedActivity, dayNum: targetDay, slot: normalizedSlot, itinerary: updated };
}
