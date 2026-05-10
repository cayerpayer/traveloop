/* ============================================
   App.jsx — Root component with routing, auth
   provider, trip provider, and toast notifications.
   ============================================ */

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { TripProvider } from './context/TripContext';
import ProtectedRoute from './routes/ProtectedRoute';

// Pages
import LoginPage from './pages/Login/LoginPage';
import SignupPage from './pages/Signup/SignupPage';
import DashboardPage from './pages/Dashboard/DashboardPage';
import CreateTripPage from './pages/CreateTrip/CreateTripPage';
import MyTripsPage from './pages/MyTrips/MyTripsPage';
import ItineraryBuilderPage from './pages/ItineraryBuilder/ItineraryBuilderPage';
import ItineraryViewPage from './pages/ItineraryView/ItineraryViewPage';
import CitySearchPage from './pages/CitySearch/CitySearchPage';
import ActivitySearchPage from './pages/ActivitySearch/ActivitySearchPage';
import BudgetPage from './pages/Budget/BudgetPage';
import PackingPage from './pages/Packing/PackingPage';
import SharedItineraryPage from './pages/SharedItinerary/SharedItineraryPage';
import ProfilePage from './pages/Profile/ProfilePage';
import NotesPage from './pages/Notes/NotesPage';

export default function App() {
  return (
    <AuthProvider>
      <TripProvider>
        <BrowserRouter>
          {/* Toast Notifications */}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#1E293B',
                color: '#F8FAFC',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '12px',
                fontFamily: "'Poppins', sans-serif",
                fontSize: '14px',
              },
              success: {
                iconTheme: { primary: '#10B981', secondary: '#F8FAFC' },
              },
              error: {
                iconTheme: { primary: '#EF4444', secondary: '#F8FAFC' },
              },
            }}
          />

          {/* Routes */}
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/shared/:id" element={<SharedItineraryPage />} />

            {/* Protected Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/create-trip"
              element={
                <ProtectedRoute>
                  <CreateTripPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/trips"
              element={
                <ProtectedRoute>
                  <MyTripsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/itinerary-builder"
              element={
                <ProtectedRoute>
                  <ItineraryBuilderPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/itinerary-view"
              element={
                <ProtectedRoute>
                  <ItineraryViewPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/destinations"
              element={
                <ProtectedRoute>
                  <CitySearchPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/activities"
              element={
                <ProtectedRoute>
                  <ActivitySearchPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/budget"
              element={
                <ProtectedRoute>
                  <BudgetPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/packing"
              element={
                <ProtectedRoute>
                  <PackingPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/shared"
              element={
                <ProtectedRoute>
                  <SharedItineraryPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/notes"
              element={
                <ProtectedRoute>
                  <NotesPage />
                </ProtectedRoute>
              }
            />

            {/* Default: redirect to login */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </BrowserRouter>
      </TripProvider>
    </AuthProvider>
  );
}
