// src/App.jsx
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';
import TodoList from './components/TodoList/TodoList'; // Displays list of todos
import FolderList from './components/FolderList'; // Displays list of folders
import AddTodoModal from './components/AddTodoModal'; // Modal for adding new todos
import Clock from './components/Clock/Clock';
import Discover from './components/Discover/Discover';
import Footer from './components/Footer/Footer'; // Footer
import { db, auth } from './components/firebase'; // Firebase Firestore
import { collection, getDocs, addDoc } from 'firebase/firestore';

const App = () => {
  const [todos, setTodos] = useState([]); // State to manage todos
  const [folders, setFolders] = useState([]); // State to manage folders
  const [isModalOpen, setModalOpen] = useState(false); // State to control modal visibility
  const [loading, setLoading] = useState(true); // Loading state

  const userId = auth.currentUser?.uid; // Get the authenticated user's ID

  // Fetch tasks from Firestore
  const fetchTasks = async () => {
    if (userId) {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, 'tasks', userId, 'taskList'));
        const tasksData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTodos(tasksData);
      } catch (error) {
        console.error("Error fetching tasks: ", error);
      } finally {
        setLoading(false);
      }
    }
  };

  // Handle adding a new todo
  const handleAddTodo = async (newTodo, dueDate, priority, notes) => {
    if (userId) {
      try {
        await addDoc(collection(db, 'tasks', userId, 'taskList'), {
          title: newTodo,
          dueDate,
          completed: false,
          priority,
          notes,
        });
        fetchTasks(); // Refresh task list after adding a new task
      } catch (error) {
        console.error("Error adding task: ", error);
      }
    }
  };

  // Fetch tasks when the component mounts
  useEffect(() => {
    if (userId) {
      fetchTasks();
    }
  }, [userId]);

  return (
    <div>
      <Navbar /> {/* Displaying the navigation bar */}
      <Clock />

      {/* Todo List Component */}
      <TodoList todos={todos} loading={loading} fetchTasks={fetchTasks} handleAddTodo={handleAddTodo} />
      
      {/* Folder List Component */}
      <FolderList folders={folders} />

      {/* Modal for adding new todos */}
      <AddTodoModal 
        isOpen={isModalOpen} 
        onClose={() => setModalOpen(false)} 
        onAdd={handleAddTodo} 
      />

      <Discover />
      <Footer /> {/* Displaying the footer */}
    </div>
  );
};

export default App;
