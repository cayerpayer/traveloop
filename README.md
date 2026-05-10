# 🌍 Traveloop

> A modern travel planning web application built for seamless trip organization.
> Live Site Link : https://traveloop-bxvi.onrender.com

[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite)](https://vite.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css)](https://tailwindcss.com)
[![React Router](https://img.shields.io/badge/React_Router-CA4245?logo=react-router)](https://reactrouter.com)
[![Render](https://img.shields.io/badge/Render-46E3B7?logo=render)](https://render.com)

## ✨ Features

- 🗺️ **Itinerary Builder** — Plan day-by-day trips with activity scheduling
- 🔍 **Activity Discovery** — Search and add activities to your itinerary
- 💰 **Budget Interface** — Track trip expenses with visual charts
- 📱 **Responsive Design** — Works seamlessly on desktop and mobile
- 🧭 **Trip Planning Flow** — Complete workflow from trip creation to itinerary
- 🔄 **Local State Management** — Persistent trip data using browser storage

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/your-org/traveloop.git
cd traveloop

# Install frontend dependencies
cd frontend
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

## 🏗️ Project Structure

```
traveloop/
├── frontend/          # React application
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Page components
│   │   ├── context/     # React context providers
│   │   ├── hooks/       # Custom React hooks
│   │   └── services/    # API service functions
│   ├── public/          # Static assets
│   └── package.json
├── backend/            # Express.js API (planned)
├── docs/              # Documentation
└── README.md
```

## 🛠️ Tech Stack

### Frontend
- **React 18** — UI framework with hooks
- **Vite** — Fast build tool and dev server
- **Tailwind CSS** — Utility-first CSS framework
- **React Router** — Client-side routing
- **Local Storage** — Client-side data persistence

### Deployment
- **Render** — Frontend hosting and deployment

## 👥 Team

- **Digvijay Pawar** — Team Leader & Frontend Developer
- **Ashok Kumar Sah** — Backend & Frontend Developer
- **Purvesh Patil** — Frontend Developer

## 🔮 Future Improvements

- Backend API integration with Express.js
- PostgreSQL database for data persistence
- User authentication and account management
- Real-time collaboration features
- Mobile app development
- Integration with external travel APIs

## 📄 License

This project is part of a hackathon submission and is not licensed for commercial use.

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
