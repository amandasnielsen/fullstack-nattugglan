import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@nattugglan/core'; 

// ser till att admin krävs för admin-sidorna
interface ProtectedRouteProps {
  component: React.ComponentType; 
  requiredRole?: 'admin'; 
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ component: Component, requiredRole }) => {
  
  const token = useAuthStore(state => state.token);
  const userRole = useAuthStore(state => state.role);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/access-denied" replace />; 
  }

  return <Component />;
};

export { ProtectedRoute };