// App.js
import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import TodoList from "./components/TodoList/TodoList";
import AddTodoModal from "./components/AddTodoModal";
import Clock from "./components/Clock/Clock";
import Discover from "./components/Discover/Discover";
import Auth from "./components/Auth"; // Import the Auth component
import Footer from "./components/Footer/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { auth } from "./components/firebase"; 
import { AuthProvider, useAuth } from "./context/AuthContext"; // Import AuthProvider

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
            <Route path="/login" element={<Auth />} />
            <Route path="/signup" element={<Auth />} />
            <Route path="/todoapp" element={user ? <TodoList todos={todos} loading={loading} /> : <Auth />} />
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
