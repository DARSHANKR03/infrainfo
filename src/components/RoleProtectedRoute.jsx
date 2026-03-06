import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import ProtectedRoute from './ProtectedRoute';

/**
 * RoleProtectedRoute - Protects routes based on user role
 * @param {React.ReactNode} children - Child components
 * @param {Array<string>} allowedRoles - Array of allowed role types ['Administrator', 'User']
 * @param {string} redirectTo - Path to redirect if access denied (default: '/dashboard')
 */
function RoleProtectedRoute({ children, allowedRoles = [], redirectTo = '/dashboard' }) {
  const { user, isAdministrator, isUser } = useAuth();

  // First check authentication via ProtectedRoute
  return (
    <ProtectedRoute>
      {/* Then check role authorization */}
      {(() => {
        // If no roles specified, allow all authenticated users
        if (allowedRoles.length === 0) {
          return children;
        }

        // Check if user's role type is in allowed roles
        const userRoleType = user?.roleType;
        const hasAccess = allowedRoles.includes(userRoleType);

        if (hasAccess) {
          return children;
        }

        // Access denied - redirect
        return <Navigate to={redirectTo} replace />;
      })()}
    </ProtectedRoute>
  );
}

/**
 * AdminRoute - Shorthand for Administrator-only routes
 */
export function AdminRoute({ children, redirectTo = '/dashboard' }) {
  return (
    <RoleProtectedRoute allowedRoles={['Administrator']} redirectTo={redirectTo}>
      {children}
    </RoleProtectedRoute>
  );
}

/**
 * UserRoute - Shorthand for User-only routes
 */
export function UserRoute({ children, redirectTo = '/dashboard' }) {
  return (
    <RoleProtectedRoute allowedRoles={['User']} redirectTo={redirectTo}>
      {children}
    </RoleProtectedRoute>
  );
}

export default RoleProtectedRoute;
