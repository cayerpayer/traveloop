/* ============================================
   ProtectedRoute — Redirects unauthenticated
   users to the login page.
   ============================================ */

import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Loader from '../components/Loader';

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Show a loader while auth state is being resolved
  if (loading) return <Loader fullScreen />;

  // If not authenticated, redirect to login with state for return URL
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
