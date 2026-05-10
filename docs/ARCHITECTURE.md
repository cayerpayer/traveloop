# Traveloop Architecture

## Monorepo Structure

```
traveloop/
│
├── frontend/                 # React + Vite client application
│   ├── public/               # Static assets served by Vite
│   │   ├── favicon.svg
│   │   └── icons.svg
│   ├── src/
│   │   ├── assets/           # Bundled assets (images, icons, fonts)
│   │   │   ├── images/
│   │   │   ├── icons/
│   │   │   ├── animations/
│   │   │   └── fonts/
│   │   ├── components/       # Reusable UI components
│   │   │   ├── Dashboard/    # Dashboard-specific (Navbar, Cards, Hero)
│   │   │   ├── Shared/       # Cross-page (EmptyState, SearchFilters)
│   │   │   ├── AuthCard.*    # Auth form wrapper
│   │   │   ├── HeroSection.* # Auth hero panel
│   │   │   ├── InputField.*  # Form input with floating labels
│   │   │   ├── Loader.*      # Loading spinner
│   │   │   ├── Navbar.*      # Public navbar
│   │   │   └── PasswordStrengthMeter.*
│   │   ├── constants/        # App-wide constants (future)
│   │   ├── context/          # React Context providers
│   │   │   ├── AuthContext.jsx
│   │   │   └── TripContext.jsx
│   │   ├── data/             # Mock data & seed data
│   │   │   ├── dashboardData.js
│   │   │   └── mockData.js
│   │   ├── hooks/            # Custom React hooks
│   │   │   └── useScrollReveal.js
│   │   ├── layouts/          # Layout wrappers (future)
│   │   ├── pages/            # Route-level page components
│   │   │   ├── ActivitySearch/
│   │   │   ├── Budget/
│   │   │   ├── CitySearch/
│   │   │   ├── CreateTrip/
│   │   │   ├── Dashboard/
│   │   │   ├── ItineraryBuilder/
│   │   │   ├── ItineraryView/
│   │   │   ├── Login/
│   │   │   ├── MyTrips/
│   │   │   ├── Notes/
│   │   │   ├── Packing/
│   │   │   ├── Profile/
│   │   │   ├── SharedItinerary/
│   │   │   └── Signup/
│   │   ├── routes/           # Route guards
│   │   │   └── ProtectedRoute.jsx
│   │   ├── services/         # API service layer (axios)
│   │   │   ├── api.js
│   │   │   ├── authService.js
│   │   │   ├── tripService.js
│   │   │   ├── itineraryService.js
│   │   │   ├── budgetService.js
│   │   │   └── notesService.js
│   │   ├── styles/           # Global CSS & design tokens
│   │   │   ├── variables.css
│   │   │   └── global.css
│   │   ├── utils/            # Utility functions
│   │   │   └── localStorage.js
│   │   ├── App.jsx           # Root app with React Router
│   │   └── main.jsx          # Entry point
│   ├── .env
│   ├── index.html
│   ├── vite.config.js
│   ├── eslint.config.js
│   ├── package.json
│   └── README.md
│
├── backend/                  # Express + MongoDB REST API
│   ├── src/
│   │   ├── config/
│   │   │   ├── db.js         # MongoDB connection
│   │   │   └── env.js        # Environment variables
│   │   ├── controllers/      # Request handlers
│   │   │   ├── authController.js
│   │   │   ├── tripController.js
│   │   │   ├── itineraryController.js
│   │   │   ├── budgetController.js
│   │   │   ├── profileController.js
│   │   │   └── notesController.js
│   │   ├── middleware/
│   │   │   ├── authMiddleware.js
│   │   │   ├── errorMiddleware.js
│   │   │   └── validateMiddleware.js
│   │   ├── models/           # Mongoose schemas
│   │   │   ├── User.js
│   │   │   ├── Trip.js
│   │   │   ├── Activity.js
│   │   │   ├── Budget.js
│   │   │   └── Note.js
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   ├── tripRoutes.js
│   │   │   ├── itineraryRoutes.js
│   │   │   ├── budgetRoutes.js
│   │   │   ├── profileRoutes.js
│   │   │   └── notesRoutes.js
│   │   ├── services/         # Business logic (future)
│   │   ├── utils/            # Helpers (future)
│   │   ├── validations/      # Request schemas (future)
│   │   ├── constants/        # App constants (future)
│   │   ├── app.js            # Express setup
│   │   └── server.js         # Entry point
│   ├── .env
│   ├── package.json
│   └── README.md
│
├── docs/                     # Documentation
│   └── ARCHITECTURE.md       # This file
│
├── .gitignore
├── package.json              # Root monorepo scripts
└── README.md                 # Project overview
```

## Data Flow

```
┌──────────┐     ┌───────────┐     ┌──────────┐     ┌──────────┐
│  React   │────►│  Services │────►│  Express │────►│ MongoDB  │
│   UI     │◄────│  (axios)  │◄────│   API    │◄────│          │
└──────────┘     └───────────┘     └──────────┘     └──────────┘
     │                                                    
     └──── localStorage (current) ────────────────────────
```

**Current state**: Frontend uses `localStorage` for all data persistence.  
**Future state**: Frontend services will call the Express API, which persists to MongoDB.

## Design System

| Token | Value | Usage |
|-------|-------|-------|
| Background | `#0F172A` | Page backgrounds |
| Primary | `#4F46E5` | Buttons, links, accents |
| Secondary | `#06B6D4` | Highlights, badges |
| Accent | `#F59E0B` | Warnings, special elements |
| Text | `#F8FAFC` | Body text |
| Font Primary | Poppins | Headings |
| Font Secondary | Inter | Body text |
| Glass BG | `rgba(255,255,255,0.04)` | Cards, surfaces |
| Glass Blur | `blur(20px)` | Backdrop filter |

## Run Commands

```bash
# From root — run both frontend and backend
npm run dev

# Frontend only
npm run client

# Backend only  
npm run server

# Install all dependencies
npm run install:all

# Build frontend
npm run build
```
