# 🌍 Traveloop

> AI-powered travel planning SaaS platform — Plan extraordinary journeys.

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite)](https://vite.dev)
[![Express](https://img.shields.io/badge/Express-5-000000?logo=express)](https://expressjs.com)
[![MongoDB](https://img.shields.io/badge/MongoDB-8-47A248?logo=mongodb)](https://mongodb.com)

## Features

- 🗺️ **Smart Itinerary Builder** — Day-by-day trip planning with morning/afternoon/evening slots
- 💰 **Budget Dashboard** — Track expenses with visual analytics (pie, bar, line charts)
- 📝 **Travel Journal** — Rich notes with mood tracking and city tags
- 🎒 **Packing Checklist** — Smart packing with progress tracking
- 🏙️ **City & Activity Search** — Discover destinations and activities
- 👤 **User Profile** — Preferences, achievements, and passport tracker
- 🔗 **Shared Itineraries** — Public trip sharing with reactions and comments
- 🔐 **Authentication** — Secure login/signup with form validation

## Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/your-org/traveloop.git
cd traveloop

# 2. Install all dependencies
npm run install:all

# 3. Start development (frontend + backend)
npm run dev
```

Frontend runs on `http://localhost:5173`  
Backend runs on `http://localhost:5000`

## Project Structure

```
traveloop/
├── frontend/     # React + Vite client (Bootstrap, Recharts)
├── backend/      # Express + MongoDB REST API
├── docs/         # Architecture documentation
├── package.json  # Monorepo scripts
└── README.md     # This file
```

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for the full folder structure.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start frontend + backend concurrently |
| `npm run client` | Start frontend only |
| `npm run server` | Start backend only |
| `npm run build` | Build frontend for production |
| `npm run install:all` | Install deps in both packages |

## Tech Stack

### Frontend
- React 19, Vite 8, React Router 7
- Bootstrap 5, Bootstrap Icons
- Recharts, React Hot Toast
- Axios (prepared for backend)

### Backend
- Express 5, MongoDB, Mongoose
- JWT Authentication, bcryptjs
- CORS, Morgan logging

## Environment Setup

### Frontend (`frontend/.env`)
```
VITE_API_URL=http://localhost:5000/api
```

### Backend (`backend/.env`)
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/traveloop
JWT_SECRET=your_secret_key
JWT_EXPIRE=30d
NODE_ENV=development
```

## License

MIT © Traveloop Team
