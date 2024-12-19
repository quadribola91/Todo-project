import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, googleProvider, signInWithPopup, signOut } from "./firebase";
import { FaGoogle } from 'react-icons/fa'; // Import Google icon
import ErrorBoundary from "../ErrorBoundary";
import AddTodoForm from "./TodoList/AddTodoForm";
import TodoList from './TodoList'; // Import your TodoList component

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [user, setUser] = useState(null); // Track the user
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track login state
  const navigate = useNavigate();

  useEffect(() => {
    // Check if there's a currently logged-in user
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      if (user) {
        setIsAuthenticated(true); // Set authenticated when user logs in
      } else {
        setIsAuthenticated(false); // Set authenticated to false when user logs out
      }
    });
    return () => unsubscribe(); // Cleanup the listener when component unmounts
  }, []);

  const toggleSignUp = () => setIsSignUp(!isSignUp); // Toggle between sign up and login

  // Handle Firebase Authentication (email/password)
  const handleAuth = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password); // Sign Up
      } else {
        await signInWithEmailAndPassword(auth, email, password); // Log In
      }
      navigate("/todoapp"); // Redirect to Todo app after successful login/signup
    } catch (error) {
      setError(error.message); // Display error message
    }
  };

  // Handle Google Authentication
  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider); // Google Sign In
      navigate("/todoapp"); // Redirect after successful login
    } catch (error) {
      setError(error.message); // Display error message
    }
  };

  // Handle Logout
  const handleLogout = async () => {
    try {
      await signOut(auth); // Firebase sign-out
      setIsAuthenticated(false); // Set authenticated state to false after logout
      navigate("/"); // Redirect to homepage after logout
    } catch (error) {
      setError(error.message); // Display error message if logout fails
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 flex justify-center items-center p-6">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        {!user ? (
          <>
            <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
              {isSignUp ? "Sign Up" : "Log In"}
            </h2>

            {/* Error message */}
            {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

            <form onSubmit={handleAuth} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-gray-700 font-medium">Email</label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-gray-700 font-medium">Password</label>
                <input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Submit button */}
              <div>
                <button
                  type="submit"
                  className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {isSignUp ? "Sign Up" : "Log In"}
                </button>
              </div>
            </form>

            {/* Toggle button between Login and SignUp */}
            <div className="mt-4 text-center text-gray-600">
              <span>
                {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
                <button
                  onClick={toggleSignUp}
                  className="text-blue-600 font-semibold hover:underline"
                >
                  {isSignUp ? "Log In" : "Sign Up"}
                </button>
              </span>
            </div>

            {/* Google Sign-In */}
            <div className="mt-6 text-center">
              <button
                onClick={handleGoogleSignIn}
                className="w-full py-3 bg-red-600 text-white rounded-lg flex items-center justify-center gap-3 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <FaGoogle size={20} />
                <span>Sign in with Google</span>
              </button>
            </div>

            {/* Link to skip SignIn */}
            <div className="mt-4 text-center">
              <Link to="/todoapp" className="text-blue-600 font-semibold hover:underline">
                Skip SignIn
              </Link>
            </div>
          </>
        ) : (
          // User is logged in - Show welcome message and TodoList
          <div className="text-center">
            <h2 className="text-xl font-bold mb-4">Welcome, {user.email}</h2>
            <button
              onClick={handleLogout}
              className="py-3 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Log Out
            </button>
            <div className="mt-6">
              {/* Render the TodoList after login */}
              <AddTodoForm/>
              <ErrorBoundary>
        <TodoList />
      </ErrorBoundary>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Auth;
