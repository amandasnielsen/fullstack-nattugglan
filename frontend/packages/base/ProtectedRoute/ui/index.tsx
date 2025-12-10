// ProtectedRoute.tsx

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@nattugglan/core'; 

interface ProtectedRouteProps {
  component: React.ComponentType; 
  requiredRole?: 'admin'; 
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ component: Component, requiredRole }) => {
  
  const token = useAuthStore(state => state.token);
  const userRole = useAuthStore(state => state.role); // Kan vara 'admin', 'user', eller null

  if (!token) {
    return <Navigate to="/login" replace />;
  }
  
  if (userRole === null) {
      return <div>Laddar behörighet...</div>; 
  }

  // 2. Kontrollera roll
  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/access-denied" replace />; 
  }

  // 3. Tillåt åtkomst
  return <Component />;
};

export { ProtectedRoute };