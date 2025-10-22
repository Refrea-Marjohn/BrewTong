import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../firebase/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();
  
  if (!currentUser) {
    return <Navigate to="/auth" replace />;
  }
  
  return children;
};

export default ProtectedRoute;
