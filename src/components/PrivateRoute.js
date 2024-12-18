import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from './firebase';

// PrivateRoute Component that checks if the user is authenticated
const PrivateRoute = ({ component: Component, ...rest }) => {
  const [user, loading] = useAuthState(auth);  // Get current authentication state

  if (loading) {
    return <div>Loading...</div>; // You can show a loader while the auth state is being determined
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        user ? ( // If the user is logged in, render the component
          <Component {...props} />
        ) : ( // If not logged in, redirect to the login page
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default PrivateRoute;
