// src/components/TodoList/TodoList.js
import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, addDoc, deleteDoc, doc, updateDoc, getDocs } from "firebase/firestore";
import TodoItem from "../TodoItem/TodoItem";
import AddTodoForm from "./AddTodoForm";

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  // Fetch tasks from Firestore
  const fetchTasks = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "tasks"));
      const tasksData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTasks(tasksData);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  // Add task locally and to Firestore
  const addTask = async (newTask, dueDate, priority, notes) => {
    const task = {
      title: newTask,
      dueDate,
      completed: false,
      priority,
      notes,
    };
    // Add to UI immediately
    const newTasks = [...tasks, { id: Date.now().toString(), ...task }];
    setTasks(newTasks);

    try {
      // Add to Firestore
      const docRef = await addDoc(collection(db, "tasks"), task);
      // Update with Firestore ID
      setTasks((prev) =>
        prev.map((t) => (t.id === task.id ? { ...t, id: docRef.id } : t))
      );
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  // Delete task locally and from Firestore
  const deleteTask = async (taskId) => {
    // Remove from UI
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);

    try {
      // Remove from Firestore
      await deleteDoc(doc(db, "tasks", taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Toggle task completion locally and in Firestore
  const toggleTask = async (taskId, completed) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !completed } : task
    );
    setTasks(updatedTasks);

    try {
      const taskDocRef = doc(db, "tasks", taskId);
      await updateDoc(taskDocRef, { completed: !completed });
    } catch (error) {
      console.error("Error toggling task:", error);
    }
  };

  // Filter and search tasks
  const filteredTasks = tasks
    .filter((task) => {
      if (filter === "all") return true;
      if (filter === "completed" && task.completed) return true;
      if (filter === "pending" && !task.completed) return true;
      return false;
    })
    .filter((task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>
      {/* Search and Filter Bar */}
      <div>
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
        </select>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="TodoList">
          {filteredTasks.map((task) => (
            <TodoItem
              key={task.id}
              task={task}
              onDelete={deleteTask}
              onToggle={toggleTask}
            />
          ))}
        </ul>
      )}

      <AddTodoForm addTask={addTask} />
    </div>
  );
}

export default TodoList;
