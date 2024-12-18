import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ element }) => {
  const { user } = useAuth(); // Access the user from context

  // If the user is authenticated, render the passed element (the component)
  // Otherwise, redirect to the login page
  return user ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
