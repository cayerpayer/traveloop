/* ============================================
   Mock Data — All modules (Features 5–13)
   ============================================ */

// ── City Data ──
export const CITIES_DATA = [
  {
    id: 'city-1', name: 'Tokyo', country: 'Japan', countryFlag: '🇯🇵',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&h=400&fit=crop',
    popularityScore: 96, costIndex: '$$$', bestSeason: 'Mar – May',
    dailyBudget: 150, region: 'Asia', climate: 'Temperate',
    tags: ['Culture', 'Food', 'Tech', 'Temples'],
    weather: { temp: '18°C', condition: 'Partly Cloudy', icon: 'bi-cloud-sun' },
    description: 'A dazzling mix of ultramodern and traditional, from neon-lit skyscrapers to historic temples.'
  },
  {
    id: 'city-2', name: 'Paris', country: 'France', countryFlag: '🇫🇷',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&h=400&fit=crop',
    popularityScore: 98, costIndex: '$$$', bestSeason: 'Jun – Sep',
    dailyBudget: 180, region: 'Europe', climate: 'Temperate',
    tags: ['Art', 'Romance', 'Food', 'History'],
    weather: { temp: '22°C', condition: 'Sunny', icon: 'bi-sun' },
    description: 'The City of Light enchants with world-class art, cuisine, and timeless architecture.'
  },
  {
    id: 'city-3', name: 'Bali', country: 'Indonesia', countryFlag: '🇮🇩',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&h=400&fit=crop',
    popularityScore: 94, costIndex: '$', bestSeason: 'Apr – Oct',
    dailyBudget: 50, region: 'Asia', climate: 'Tropical',
    tags: ['Beach', 'Temples', 'Surfing', 'Yoga'],
    weather: { temp: '28°C', condition: 'Sunny', icon: 'bi-brightness-high' },
    description: 'Tropical paradise with lush rice terraces, ancient temples, and world-class surf.'
  },
  {
    id: 'city-4', name: 'Goa', country: 'India', countryFlag: '🇮🇳',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600&h=400&fit=crop',
    popularityScore: 88, costIndex: '$', bestSeason: 'Nov – Feb',
    dailyBudget: 35, region: 'Asia', climate: 'Tropical',
    tags: ['Beach', 'Nightlife', 'Water Sports', 'Food'],
    weather: { temp: '30°C', condition: 'Clear', icon: 'bi-sun' },
    description: 'India\'s beach capital blending Portuguese heritage with vibrant nightlife.'
  },
  {
    id: 'city-5', name: 'Dubai', country: 'UAE', countryFlag: '🇦🇪',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&h=400&fit=crop',
    popularityScore: 92, costIndex: '$$$$', bestSeason: 'Nov – Mar',
    dailyBudget: 250, region: 'Middle East', climate: 'Arid',
    tags: ['Luxury', 'Shopping', 'Adventure', 'Architecture'],
    weather: { temp: '35°C', condition: 'Clear', icon: 'bi-sun' },
    description: 'A futuristic city of superlatives — tallest towers, luxury resorts, and desert adventures.'
  },
  {
    id: 'city-6', name: 'Santorini', country: 'Greece', countryFlag: '🇬🇷',
    image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=600&h=400&fit=crop',
    popularityScore: 95, costIndex: '$$$', bestSeason: 'Apr – Oct',
    dailyBudget: 160, region: 'Europe', climate: 'Mediterranean',
    tags: ['Beach', 'Sunset', 'Wine', 'History'],
    weather: { temp: '25°C', condition: 'Sunny', icon: 'bi-sun' },
    description: 'Iconic white-washed villages perched on volcanic cliffs with breathtaking Aegean sunsets.'
  },
  {
    id: 'city-7', name: 'Zurich', country: 'Switzerland', countryFlag: '🇨🇭',
    image: 'https://images.unsplash.com/photo-1515488764276-beab7607c1e6?w=600&h=400&fit=crop',
    popularityScore: 85, costIndex: '$$$$', bestSeason: 'Jun – Sep',
    dailyBudget: 280, region: 'Europe', climate: 'Temperate',
    tags: ['Nature', 'Skiing', 'Lakes', 'Luxury'],
    weather: { temp: '15°C', condition: 'Cloudy', icon: 'bi-clouds' },
    description: 'Switzerland\'s largest city offering alpine scenery, pristine lakes, and refined culture.'
  },
];

// ── Activities Data ──
export const ACTIVITIES_DATA = [
  {
    id: 'act-1', name: 'Sunrise Temple Tour', city: 'Bali',
    image: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=600&h=400&fit=crop',
    category: 'Adventure', cost: 45, rating: 4.8, reviews: 324,
    duration: '4 hours', difficulty: 'Easy', tags: ['Culture', 'Photography'],
    description: 'Visit ancient Balinese temples at sunrise for a magical spiritual experience.'
  },
  {
    id: 'act-2', name: 'Street Food Walking Tour', city: 'Tokyo',
    image: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=600&h=400&fit=crop',
    category: 'Food Tours', cost: 65, rating: 4.9, reviews: 512,
    duration: '3 hours', difficulty: 'Easy', tags: ['Food', 'Culture'],
    description: 'Explore Tokyo\'s hidden street food gems with a local guide.'
  },
  {
    id: 'act-3', name: 'Scuba Diving Adventure', city: 'Goa',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&h=400&fit=crop',
    category: 'Adventure', cost: 80, rating: 4.7, reviews: 198,
    duration: '5 hours', difficulty: 'Moderate', tags: ['Water Sports', 'Nature'],
    description: 'Discover vibrant coral reefs and marine life in the Arabian Sea.'
  },
  {
    id: 'act-4', name: 'Desert Safari & BBQ', city: 'Dubai',
    image: 'https://images.unsplash.com/photo-1451337516015-6b6e9a44a8a3?w=600&h=400&fit=crop',
    category: 'Adventure', cost: 120, rating: 4.8, reviews: 876,
    duration: '6 hours', difficulty: 'Easy', tags: ['Adventure', 'Food'],
    description: 'Dune bashing, camel rides, and a traditional BBQ under the stars.'
  },
  {
    id: 'act-5', name: 'Louvre Museum Tour', city: 'Paris',
    image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=600&h=400&fit=crop',
    category: 'Museums', cost: 55, rating: 4.9, reviews: 1204,
    duration: '4 hours', difficulty: 'Easy', tags: ['Art', 'History'],
    description: 'Skip-the-line guided tour of the world\'s most visited museum.'
  },
  {
    id: 'act-6', name: 'Santorini Wine Tasting', city: 'Santorini',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop',
    category: 'Food Tours', cost: 90, rating: 4.6, reviews: 267,
    duration: '3 hours', difficulty: 'Easy', tags: ['Wine', 'Sunset'],
    description: 'Sample volcanic wines at cliffside vineyards with sunset views.'
  },
  {
    id: 'act-7', name: 'Alpine Hiking Trail', city: 'Zurich',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&h=400&fit=crop',
    category: 'Hiking', cost: 30, rating: 4.8, reviews: 432,
    duration: '6 hours', difficulty: 'Hard', tags: ['Nature', 'Fitness'],
    description: 'Trek through stunning Swiss alpine meadows with panoramic mountain views.'
  },
  {
    id: 'act-8', name: 'Beach Club Party', city: 'Bali',
    image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=600&h=400&fit=crop',
    category: 'Nightlife', cost: 75, rating: 4.5, reviews: 389,
    duration: '5 hours', difficulty: 'Easy', tags: ['Nightlife', 'Beach'],
    description: 'Experience Bali\'s legendary beach club scene with DJs and ocean views.'
  },
  {
    id: 'act-9', name: 'Luxury Mall Shopping', city: 'Dubai',
    image: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=600&h=400&fit=crop',
    category: 'Shopping', cost: 0, rating: 4.4, reviews: 654,
    duration: '4 hours', difficulty: 'Easy', tags: ['Shopping', 'Luxury'],
    description: 'Explore the Dubai Mall — the world\'s largest shopping destination.'
  },
];

// ── Budget Categories ──
export const BUDGET_CATEGORIES = [
  { id: 'flights', name: 'Flights', icon: 'bi-airplane', color: '#4F46E5', amount: 2400 },
  { id: 'hotels', name: 'Hotels', icon: 'bi-building', color: '#06B6D4', amount: 1800 },
  { id: 'food', name: 'Food', icon: 'bi-cup-hot', color: '#F59E0B', amount: 950 },
  { id: 'activities', name: 'Activities', icon: 'bi-lightning', color: '#10B981', amount: 680 },
  { id: 'shopping', name: 'Shopping', icon: 'bi-bag', color: '#EC4899', amount: 420 },
  { id: 'transport', name: 'Transport', icon: 'bi-bus-front', color: '#8B5CF6', amount: 300 },
];

export const EXPENSE_TRENDS = [
  { day: 'Day 1', flights: 1200, hotels: 300, food: 80, activities: 0, transport: 50 },
  { day: 'Day 2', flights: 0, hotels: 300, food: 120, activities: 150, transport: 40 },
  { day: 'Day 3', flights: 0, hotels: 300, food: 95, activities: 200, transport: 30 },
  { day: 'Day 4', flights: 0, hotels: 300, food: 110, activities: 80, transport: 60 },
  { day: 'Day 5', flights: 0, hotels: 300, food: 140, activities: 120, transport: 45 },
  { day: 'Day 6', flights: 1200, hotels: 300, food: 130, activities: 130, transport: 75 },
  { day: 'Day 7', flights: 0, hotels: 0, food: 75, activities: 0, transport: 0 },
];

// ── Packing Categories ──
export const PACKING_DEFAULTS = [
  { id: 'p1', name: 'Passport', category: 'Documents', quantity: 1, priority: 'high', packed: false },
  { id: 'p2', name: 'Travel Insurance', category: 'Documents', quantity: 1, priority: 'high', packed: false },
  { id: 'p3', name: 'Flight Tickets', category: 'Documents', quantity: 1, priority: 'high', packed: false },
  { id: 'p4', name: 'T-Shirts', category: 'Clothing', quantity: 5, priority: 'medium', packed: false },
  { id: 'p5', name: 'Jeans / Shorts', category: 'Clothing', quantity: 3, priority: 'medium', packed: false },
  { id: 'p6', name: 'Underwear', category: 'Clothing', quantity: 7, priority: 'high', packed: false },
  { id: 'p7', name: 'Jacket', category: 'Clothing', quantity: 1, priority: 'low', packed: false },
  { id: 'p8', name: 'Phone Charger', category: 'Electronics', quantity: 1, priority: 'high', packed: false },
  { id: 'p9', name: 'Power Bank', category: 'Electronics', quantity: 1, priority: 'medium', packed: false },
  { id: 'p10', name: 'Camera', category: 'Electronics', quantity: 1, priority: 'medium', packed: false },
  { id: 'p11', name: 'Headphones', category: 'Electronics', quantity: 1, priority: 'low', packed: false },
  { id: 'p12', name: 'Sunscreen', category: 'Accessories', quantity: 1, priority: 'medium', packed: false },
  { id: 'p13', name: 'Sunglasses', category: 'Accessories', quantity: 1, priority: 'low', packed: false },
  { id: 'p14', name: 'Pain Relief', category: 'Medicines', quantity: 1, priority: 'medium', packed: false },
  { id: 'p15', name: 'Band-Aids', category: 'Medicines', quantity: 1, priority: 'low', packed: false },
];

export const PACKING_CATEGORY_ICONS = {
  Clothing: 'bi-backpack2',
  Electronics: 'bi-laptop',
  Documents: 'bi-file-earmark-text',
  Medicines: 'bi-capsule',
  Accessories: 'bi-watch',
};

// ── Sample Notes ──
export const SAMPLE_NOTES = [
  {
    id: 'note-1', title: 'Bali Temple Etiquette',
    content: 'Remember to wear a sarong when visiting temples. Rent one at the entrance for about $1. Be respectful and follow the guide\'s instructions.',
    date: '2026-06-10', mood: '🙏', tags: ['Culture', 'Tips'],
    tripId: null, city: 'Bali'
  },
  {
    id: 'note-2', title: 'Best Ramen in Tokyo',
    content: 'Ichiran Ramen in Shibuya was incredible! The solo booth experience is unique. Try the extra-rich tonkotsu with extra noodles.',
    date: '2026-05-08', mood: '😋', tags: ['Food', 'Recommendation'],
    tripId: null, city: 'Tokyo'
  },
  {
    id: 'note-3', title: 'Paris Metro Tips',
    content: 'Buy a carnet of 10 tickets for savings. The metro is the fastest way around. Avoid rush hour (8-9am, 5-7pm).',
    date: '2026-05-05', mood: '💡', tags: ['Transport', 'Tips'],
    tripId: null, city: 'Paris'
  },
];

// ── Mood Options ──
export const MOOD_OPTIONS = ['😊', '😍', '🤩', '😋', '🙏', '💡', '📸', '🏖️', '⛰️', '✈️'];
