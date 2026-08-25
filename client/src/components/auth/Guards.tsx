import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';

interface GuardProps {
  children: React.ReactNode;
}

export function RequireAuth({ children }: GuardProps) {
  const { isAuthenticated } = useAuthStore();
  const location = useLocation();
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return <>{children}</>;
}

export function RequireAdmin({ children }: GuardProps) {
  const { isAuthenticated, user } = useAuthStore();
  const location = useLocation();
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  const isAdmin = user?.role === 'ADMIN' || user?.role === 'admin';
  if (!isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }
  return <>{children}</>;
}
