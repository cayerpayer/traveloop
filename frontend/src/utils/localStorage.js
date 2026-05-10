/* ============================================
   localStorage CRUD Utilities
   ============================================ */

export function getItem(key, fallback = null) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function setItem(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn('localStorage setItem failed', e);
  }
}

export function removeItem(key) {
  localStorage.removeItem(key);
}

// ── CRUD helpers for array-based collections ──
export function addToCollection(key, item) {
  const list = getItem(key, []);
  list.unshift(item);
  setItem(key, list);
  return list;
}

export function updateInCollection(key, id, updates) {
  const list = getItem(key, []);
  const updated = list.map((i) => (i.id === id ? { ...i, ...updates } : i));
  setItem(key, updated);
  return updated;
}

export function deleteFromCollection(key, id) {
  const list = getItem(key, []).filter((i) => i.id !== id);
  setItem(key, list);
  return list;
}

export function getFromCollection(key, id) {
  return getItem(key, []).find((i) => i.id === id) || null;
}

// ── Storage Keys ──
export const STORAGE_KEYS = {
  ITINERARIES: 'traveloop_itineraries',
  PACKING: 'traveloop_packing',
  NOTES: 'traveloop_notes',
  PROFILE: 'traveloop_profile',
  SAVED_CITIES: 'traveloop_saved_cities',
  SAVED_ACTIVITIES: 'traveloop_saved_activities',
  ACTIVE_TRIP_ID: 'traveloop_active_trip_id',
  BUDGET: 'traveloop_budget',
};
