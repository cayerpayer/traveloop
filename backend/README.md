# Traveloop Backend

Express.js + MongoDB REST API for the Traveloop travel planning platform.

## Tech Stack

- **Express 5** — Web framework
- **MongoDB + Mongoose** — Database & ODM
- **JWT** — Authentication tokens
- **bcryptjs** — Password hashing
- **CORS** — Cross-origin support
- **Morgan** — HTTP request logging
- **Nodemon** — Development auto-restart

## Getting Started

```bash
# Install dependencies
npm install

# Start development server (with nodemon)
npm run dev

# Start production server
npm start
```

## Environment Variables

Create a `.env` file in the backend root:

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `MONGO_URI` | MongoDB connection string | `mongodb://localhost:27017/traveloop` |
| `JWT_SECRET` | JWT signing secret | (change in production!) |
| `JWT_EXPIRE` | Token expiration | `30d` |
| `NODE_ENV` | Environment mode | `development` |

## API Endpoints

### Auth
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/auth/register` | Register user | Public |
| POST | `/api/auth/login` | Login user | Public |
| GET | `/api/auth/me` | Get current user | Private |
| POST | `/api/auth/logout` | Logout | Private |
| PUT | `/api/auth/profile` | Update profile | Private |

### Trips
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/trips` | Get all trips | Private |
| GET | `/api/trips/:id` | Get single trip | Private |
| POST | `/api/trips` | Create trip | Private |
| PUT | `/api/trips/:id` | Update trip | Private |
| DELETE | `/api/trips/:id` | Delete trip | Private |

### Itineraries
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/itineraries/:tripId` | Get itinerary | Private |
| POST | `/api/itineraries/:tripId/activities` | Add activity | Private |
| PUT | `/api/itineraries/:tripId/activities/:id` | Update activity | Private |
| DELETE | `/api/itineraries/:tripId/activities/:id` | Delete activity | Private |

### Budget
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/budgets/:tripId` | Get budget | Private |
| PUT | `/api/budgets/:tripId` | Update budget | Private |
| POST | `/api/budgets/:tripId/expenses` | Add expense | Private |
| DELETE | `/api/budgets/:tripId/expenses/:id` | Delete expense | Private |

### Notes
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/notes` | Get all notes | Private |
| GET | `/api/notes/:id` | Get single note | Private |
| POST | `/api/notes` | Create note | Private |
| PUT | `/api/notes/:id` | Update note | Private |
| DELETE | `/api/notes/:id` | Delete note | Private |

### Health
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/health` | Health check | Public |

## Project Structure

```
src/
├── config/          # Database & environment config
├── controllers/     # Route handlers (business logic)
├── middleware/       # Auth, error, validation middleware
├── models/          # Mongoose schemas
├── routes/          # Express route definitions
├── services/        # Business logic services (future)
├── utils/           # Helper utilities (future)
├── validations/     # Request validation schemas (future)
├── constants/       # App constants (future)
├── app.js           # Express app setup
└── server.js        # Entry point
```
