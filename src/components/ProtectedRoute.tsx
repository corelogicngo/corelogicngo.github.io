import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
  requireAdmin?: boolean;
  requireSchool?: boolean;
}

export default function ProtectedRoute({ children, requireAdmin, requireSchool }: ProtectedRouteProps) {
  const { user, isAdmin, schoolId, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[hsl(6,77%,28%)]"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requireAdmin && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  if (requireSchool && !schoolId) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
