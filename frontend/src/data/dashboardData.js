/* ============================================
   Dashboard Mock Data — Realistic travel data
   for all dashboard sections.
   ============================================ */

// ── Upcoming Trips ──
export const TRIPS_DATA = [
  {
    id: 1,
    title: 'Bali Escape',
    destination: 'Bali, Indonesia',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&h=400&fit=crop',
    startDate: 'Jun 15, 2026',
    endDate: 'Jun 22, 2026',
    days: 7,
    budget: 2800,
    spent: 1200,
    travelers: 2,
    progress: 65,
    status: 'Upcoming',
    statusColor: '#06B6D4',
  },
  {
    id: 2,
    title: 'Europe Backpacking',
    destination: 'Paris → Rome → Barcelona',
    image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=600&h=400&fit=crop',
    startDate: 'Aug 3, 2026',
    endDate: 'Aug 18, 2026',
    days: 15,
    budget: 5500,
    spent: 2100,
    travelers: 4,
    progress: 42,
    status: 'Planning',
    statusColor: '#F59E0B',
  },
  {
    id: 3,
    title: 'Dubai Luxury Tour',
    destination: 'Dubai, UAE',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&h=400&fit=crop',
    startDate: 'Oct 10, 2026',
    endDate: 'Oct 16, 2026',
    days: 6,
    budget: 4200,
    spent: 800,
    travelers: 2,
    progress: 25,
    status: 'Draft',
    statusColor: '#94A3B8',
  },
  {
    id: 4,
    title: 'Himachal Road Trip',
    destination: 'Manali → Spiti → Shimla',
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=600&h=400&fit=crop',
    startDate: 'Nov 5, 2026',
    endDate: 'Nov 14, 2026',
    days: 9,
    budget: 1800,
    spent: 450,
    travelers: 6,
    progress: 18,
    status: 'Draft',
    statusColor: '#94A3B8',
  },
];

// ── Recommended Destinations ──
export const DESTINATIONS_DATA = [
  {
    id: 1,
    city: 'Santorini',
    country: 'Greece',
    image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=600&h=500&fit=crop',
    budget: '$2,200',
    bestSeason: 'Apr – Oct',
    activities: ['Beach', 'History', 'Sunset', 'Wine'],
    match: 95,
    saved: false,
  },
  {
    id: 2,
    city: 'Tokyo',
    country: 'Japan',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&h=500&fit=crop',
    budget: '$3,100',
    bestSeason: 'Mar – May',
    activities: ['Culture', 'Food', 'Tech', 'Temples'],
    match: 88,
    saved: false,
  },
  {
    id: 3,
    city: 'Paris',
    country: 'France',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&h=500&fit=crop',
    budget: '$2,800',
    bestSeason: 'Jun – Sep',
    activities: ['Art', 'Romance', 'Food', 'History'],
    match: 92,
    saved: true,
  },
  {
    id: 4,
    city: 'Swiss Alps',
    country: 'Switzerland',
    image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=600&h=500&fit=crop',
    budget: '$3,500',
    bestSeason: 'Dec – Mar',
    activities: ['Skiing', 'Hiking', 'Nature', 'Lakes'],
    match: 85,
    saved: false,
  },
  {
    id: 5,
    city: 'Goa',
    country: 'India',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600&h=500&fit=crop',
    budget: '$800',
    bestSeason: 'Nov – Feb',
    activities: ['Beach', 'Nightlife', 'Water Sports', 'Food'],
    match: 90,
    saved: false,
  },
  {
    id: 6,
    city: 'Maldives',
    country: 'Maldives',
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600&h=500&fit=crop',
    budget: '$4,200',
    bestSeason: 'Nov – Apr',
    activities: ['Diving', 'Luxury', 'Beach', 'Spa'],
    match: 78,
    saved: true,
  },
];

// ── Budget Analytics ──
export const BUDGET_DATA = {
  totalBudget: 14300,
  amountSpent: 4550,
  savings: 2100,
  upcomingExpenses: 3200,
  trends: {
    budget: '+12%',
    spent: '+8%',
    savings: '+22%',
    upcoming: '-5%',
  },
};

// ── Quick Action Cards ──
export const QUICK_ACTIONS_DATA = [
  {
    id: 1,
    icon: 'bi-airplane',
    title: 'Plan New Trip',
    description: 'Create a new travel itinerary',
    gradient: 'linear-gradient(135deg, #4F46E5, #7C3AED)',
    path: '/create-trip',
  },
  {
    id: 2,
    icon: 'bi-journal-text',
    title: 'My Itineraries',
    description: 'View & manage your plans',
    gradient: 'linear-gradient(135deg, #06B6D4, #0EA5E9)',
    path: '/trips',
  },
  {
    id: 3,
    icon: 'bi-wallet2',
    title: 'Budget Tracker',
    description: 'Track expenses & savings',
    gradient: 'linear-gradient(135deg, #10B981, #059669)',
    path: '/budget',
  },
  {
    id: 4,
    icon: 'bi-people',
    title: 'Shared Trips',
    description: 'Collaborate with friends',
    gradient: 'linear-gradient(135deg, #F59E0B, #F97316)',
    path: '/shared',
  },
];

// ── Activity Timeline ──
export const ACTIVITY_DATA = [
  {
    id: 1,
    type: 'trip_created',
    icon: 'bi-airplane-engines',
    color: '#4F46E5',
    title: 'New trip created',
    description: 'Bali Escape — 7 days adventure planned',
    time: '2 hours ago',
  },
  {
    id: 2,
    type: 'budget_updated',
    icon: 'bi-wallet2',
    color: '#10B981',
    title: 'Budget updated',
    description: 'Europe Backpacking budget increased to $5,500',
    time: '5 hours ago',
  },
  {
    id: 3,
    type: 'destination_saved',
    icon: 'bi-heart-fill',
    color: '#EF4444',
    title: 'Destination saved',
    description: 'Santorini, Greece added to your wishlist',
    time: '1 day ago',
  },
  {
    id: 4,
    type: 'itinerary_shared',
    icon: 'bi-share',
    color: '#06B6D4',
    title: 'Itinerary shared',
    description: 'Dubai Luxury Tour shared with 2 travel buddies',
    time: '2 days ago',
  },
  {
    id: 5,
    type: 'trip_completed',
    icon: 'bi-check-circle-fill',
    color: '#F59E0B',
    title: 'Trip completed',
    description: 'Kerala Backwaters — Marked as completed',
    time: '1 week ago',
  },
];

// ── AI Travel Insights ──
export const INSIGHTS_DATA = [
  {
    id: 1,
    icon: 'bi-graph-down-arrow',
    badge: 'Price Drop',
    badgeColor: '#10B981',
    title: 'Flights to Bali are 20% cheaper this week',
    description: 'Book now to save up to ₹12,000 on round-trip flights from Delhi.',
    type: 'savings',
  },
  {
    id: 2,
    icon: 'bi-cloud-sun',
    badge: 'Weather Alert',
    badgeColor: '#06B6D4',
    title: 'Best weather in Switzerland next month',
    description: 'Clear skies and mild temperatures perfect for hiking and sightseeing.',
    type: 'weather',
  },
  {
    id: 3,
    icon: 'bi-piggy-bank',
    badge: 'Smart Savings',
    badgeColor: '#F59E0B',
    title: 'Save ₹15,000 by shifting dates',
    description: 'Moving your Europe trip by 2 weeks could save significantly on flights & hotels.',
    type: 'budget',
  },
];

// ── Inspirational Quotes ──
export const TRAVEL_QUOTES = [
  { text: "The world is a book, and those who do not travel read only one page.", author: "Saint Augustine" },
  { text: "Travel is the only thing you buy that makes you richer.", author: "Anonymous" },
  { text: "Not all those who wander are lost.", author: "J.R.R. Tolkien" },
  { text: "Life is short and the world is wide.", author: "Simon Raven" },
  { text: "Adventure is worthwhile in itself.", author: "Amelia Earhart" },
  { text: "To travel is to live.", author: "Hans Christian Andersen" },
];
