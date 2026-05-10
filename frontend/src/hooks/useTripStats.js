import { useMemo } from 'react';
import { useTrips } from '../context/TripContext';

const UPCOMING_STATUSES = new Set(['planning', 'upcoming']);
const STATUS_COLORS = {
  upcoming: '#06B6D4',
  planning: '#F59E0B',
  completed: '#10B981',
  draft: '#94A3B8',
};

function startOfToday() {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  return date;
}

export function getTripDestinations(trip) {
  const values = [];
  if (Array.isArray(trip?.destinations)) values.push(...trip.destinations);
  if (typeof trip?.destinations === 'string') values.push(...trip.destinations.split(','));
  if (trip?.destination) values.push(...String(trip.destination).split(/[→,]/));
  if (trip?.city) values.push(trip.city);

  return values
    .map((item) => String(item).trim())
    .filter(Boolean);
}

export function isUpcomingTrip(trip) {
  const status = String(trip?.status || '').toLowerCase();
  const tripStart = trip?.startDate ? new Date(trip.startDate) : null;
  const hasFutureDate = tripStart && !Number.isNaN(tripStart.valueOf()) && tripStart >= startOfToday();

  if (status === 'draft' || status === 'completed' || status === 'cancelled') return false;
  return UPCOMING_STATUSES.has(status) || hasFutureDate;
}

function getDuration(startDate, endDate) {
  if (!startDate || !endDate) return 0;
  const start = new Date(startDate);
  const end = new Date(endDate);
  if (Number.isNaN(start.valueOf()) || Number.isNaN(end.valueOf())) return 0;
  return Math.max(1, Math.ceil((end - start) / (1000 * 60 * 60 * 24)));
}

function formatShortDate(date) {
  if (!date) return '';
  const parsed = new Date(date);
  if (Number.isNaN(parsed.valueOf())) return '';
  return parsed.toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' });
}

export function toDashboardTrip(trip) {
  const destinations = getTripDestinations(trip);
  const status = String(trip.status || 'planning').toLowerCase();
  const budget = Number(trip.budget) || 0;
  const spent = Number(trip.spent) || 0;
  const progress = budget > 0 ? Math.min(100, Math.round((spent / budget) * 100)) : isUpcomingTrip(trip) ? 25 : 0;

  return {
    id: trip.id,
    title: trip.tripName || trip.title || 'Untitled Trip',
    destination: destinations.length ? destinations.join(' → ') : 'Destination pending',
    image: trip.coverImage || trip.image || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=500&fit=crop',
    startDate: formatShortDate(trip.startDate),
    endDate: formatShortDate(trip.endDate),
    days: getDuration(trip.startDate, trip.endDate),
    budget,
    spent,
    travelers: Number(trip.travelers) || 1,
    progress,
    status: status.charAt(0).toUpperCase() + status.slice(1),
    statusColor: STATUS_COLORS[status] || '#94A3B8',
  };
}

export default function useTripStats() {
  const { trips, loading } = useTrips();

  return useMemo(() => {
    const destinations = new Set();
    let totalBudget = 0;
    let amountSpent = 0;
    let upcoming = 0;

    trips.forEach((trip) => {
      totalBudget += Number(trip.budget) || 0;
      amountSpent += Number(trip.spent) || 0;
      getTripDestinations(trip).forEach((destination) => {
        destinations.add(destination.toLowerCase());
      });
      if (isUpcomingTrip(trip)) upcoming += 1;
    });

    const recentTrips = [...trips]
      .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
      .slice(0, 4)
      .map(toDashboardTrip);

    const upcomingTrips = trips
      .filter(isUpcomingTrip)
      .sort((a, b) => new Date(a.startDate || 8640000000000000) - new Date(b.startDate || 8640000000000000))
      .slice(0, 4)
      .map(toDashboardTrip);

    return {
      loading,
      totalTrips: trips.length,
      destinations: destinations.size,
      upcoming,
      totalBudget,
      amountSpent,
      remainingBudget: Math.max(totalBudget - amountSpent, 0),
      plannedBudget: trips.filter(isUpcomingTrip).reduce((sum, trip) => sum + (Number(trip.budget) || 0), 0),
      hasTrips: trips.length > 0,
      recentTrips,
      upcomingTrips,
      trips,
    };
  }, [trips, loading]);
}
