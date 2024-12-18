import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../components/firebase"; // Import your firebase auth setup
import { useAuthState } from "react-firebase-hooks/auth";

// Create the AuthContext
const AuthContext = createContext();

// AuthContext provider to provide auth state to the rest of the app
export const AuthProvider = ({ children }) => {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <div>Loading...</div>; // You can customize this
  }

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext);
