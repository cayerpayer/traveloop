# Traveloop Frontend

The React + Vite frontend for the Traveloop travel planning platform.

## Tech Stack

- **React 19** — UI library
- **Vite 8** — Build tool & dev server
- **Bootstrap 5** — CSS framework
- **Bootstrap Icons** — Icon library
- **React Router DOM** — Client-side routing
- **Recharts** — Data visualization
- **React Hot Toast** — Notifications
- **Axios** — HTTP client (prepared for backend)

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── assets/          # Images, icons, static files
├── components/      # Reusable UI components
│   ├── Dashboard/   # Dashboard-specific components
│   └── Shared/      # Cross-page shared components
├── constants/       # App-wide constants (future)
├── context/         # React Context providers
│   ├── AuthContext   # Authentication state
│   └── TripContext   # Trip management state
├── data/            # Mock data & seed data
├── hooks/           # Custom React hooks
├── layouts/         # Page layout wrappers (future)
├── pages/           # Route-level page components
├── routes/          # Route guards & config
├── services/        # API service layer (prepared)
├── styles/          # Global CSS & design tokens
├── utils/           # Utility functions
├── App.jsx          # Root app with router
└── main.jsx         # Entry point
```

## Design System

- **Background**: `#0F172A`
- **Primary**: `#4F46E5` (Indigo)
- **Secondary**: `#06B6D4` (Cyan)
- **Accent**: `#F59E0B` (Amber)
- **Typography**: Poppins + Inter
- **Style**: Glassmorphism with dark theme

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API base URL | `http://localhost:5000/api` |
