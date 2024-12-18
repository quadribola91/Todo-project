import React, { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../firebase"; // Adjust the path to your firebase.js

const AuthContext = createContext();

// Custom hook to use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Listen to authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false); // Set loading to false when the user is determined
    });

    return () => unsubscribe();
  }, []);

  // Signup function
  const signup = async (email, password) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      throw new Error(error.message); // Handle any signup errors
    }
  };

  // Login function
  const login = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      throw new Error(error.message); // Handle any login errors
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await signOut(auth); // Sign the user out
    } catch (error) {
      throw new Error(error.message); // Handle logout errors
    }
  };

  return (
    <section id="authcontext">
         <AuthContext.Provider value={{ user, signup, login, logout }}>
      {!loading && children} {/* Only render children when authentication status is determined */}
    </AuthContext.Provider>
    </section>
   
  );
};
