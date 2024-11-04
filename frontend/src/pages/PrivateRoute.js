// PrivateRoute.js

import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const token = sessionStorage.getItem('authToken');
  const expiration = sessionStorage.getItem('tokenExpiration');

  if (!token || (expiration && Date.now() > expiration)) {
    // Clear session storage and redirect to login if token is invalid or expired
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('tokenExpiration');
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
