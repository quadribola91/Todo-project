import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import TodoList from "./components/TodoList/TodoList";
import AddTodoModal from "./components/AddTodoModal";
import './App.css'; // Adjust the path based on where the file is located

import Clock from "./components/Clock/Clock";
import Discover from "./components/Discover/Discover";
import Auth from "./components/Auth"; // Import the Auth component
import Footer from "./components/Footer/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { auth } from "./components/firebase"; 
import { AuthProvider, useAuth } from "./context/AuthContext"; // Import AuthProvider
import Landing from "./components/Landing /Landing"; // Fix the space in the import path
import AddTodoForm from "./components/TodoList/AddTodoForm";

const App = () => {
  const { user } = useAuth();
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(true);

  const fetchTasks = async () => {
    // Fetch tasks logic...
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        fetchTasks();
      }
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (authLoading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthProvider>
      <Router>
        <div>
          <Navbar />
          <Clock />
          <Routes>
            {/* Home Route: Landing page is part of the home page */}
            <Route
              path="/"
              element={
                <div>
                  <Landing /> {/* Landing is now part of the homepage */}
                  <Footer />
                </div>
              }
            />

            {/* TodoApp Route: Only renders the Auth component with Navbar and Footer */}
            <Route
              path="/todoapp"
              element={
                <div>
                  <div className="todoapp-layout">
                    {/* Auth page as content on /todoapp route */}
                    <Auth />
                  </div>
                  <Footer />
                </div>
              }
            />

            {/* Other Routes */}
            <Route path="/login" element={<Auth />} />
            <Route path="/signup" element={<Auth />} />
            <Route path="/discover" element={<Discover />} />
          </Routes>

          {/* Optional AddTodoModal - can be conditionally rendered based on state */}
          <AddTodoModal isOpen={false} onClose={() => {}} onAdd={() => {}} />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
