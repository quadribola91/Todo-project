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
import Landing from "./components/Landing /Landing";

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
          <Landing />
          <Routes>
            <Route path="/login" element={<Auth />} />
            <Route path="/signup" element={<Auth />} />

            {/* Modify the todoapp route to display Auth component only, along with Navbar and Footer */}
            <Route
              path="/todoapp"
              element={
                <div className="todoapp-layout">
                  <div className="todoapp-content">
                    {/* Only the Auth page will be shown as content */}
                    <Auth />
                  </div>
                </div>
              }
            />

            <Route path="/discover" element={<Discover />} />
          </Routes>

          <AddTodoModal isOpen={false} onClose={() => {}} onAdd={() => {}} />
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
