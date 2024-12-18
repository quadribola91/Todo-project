import React, { useState, useEffect } from "react";
import { db } from "../firebaseConfig";  // Correctly import db from firebaseConfig
import { collection, addDoc, deleteDoc, doc, updateDoc, getDocs } from "firebase/firestore";
import TodoItem from "../TodoItem/TodoItem";
import AddTodoForm from "./AddTodoForm";

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [editTask, setEditTask] = useState(null);  // State to handle editing task
  const [newTaskDetails, setNewTaskDetails] = useState({
    title: "",
    dueDate: "",
    priority: "",
    notes: "",
  });

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

  // Add task to Firestore and update UI
  const addTask = async (newTask, dueDate, priority, notes) => {
    const task = {
      title: newTask,
      dueDate,
      completed: false,
      priority,
      notes,
    };

    try {
      const docRef = await addDoc(collection(db, "tasks"), task);
      setTasks((prevTasks) => [...prevTasks, { id: docRef.id, ...task }]);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  // Edit task handler
  const editTaskHandler = (task) => {
    setEditTask(task); // Set the task to be edited
    setNewTaskDetails({
      title: task.title,
      dueDate: task.dueDate,
      priority: task.priority,
      notes: task.notes,
    });
  };

  // Save edited task to Firestore
  const saveEditedTask = async () => {
    const updatedTask = {
      title: newTaskDetails.title,
      dueDate: newTaskDetails.dueDate,
      priority: newTaskDetails.priority,
      notes: newTaskDetails.notes,
    };

    try {
      const taskDocRef = doc(db, "tasks", editTask.id);
      await updateDoc(taskDocRef, updatedTask); // Update the task in Firestore

      // Update the task in UI state
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === editTask.id ? { ...task, ...updatedTask } : task
        )
      );
      setEditTask(null); // Close the edit form
    } catch (error) {
      console.error("Error saving edited task:", error);
    }
  };

  // Cancel edit
  const cancelEdit = () => {
    setEditTask(null);
    setNewTaskDetails({
      title: "",
      dueDate: "",
      priority: "",
      notes: "",
    });
  };

  // Delete task from Firestore and update UI
  const deleteTask = async (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);

    try {
      await deleteDoc(doc(db, "tasks", taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Toggle task completion status in Firestore and UI
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

  // Filter tasks based on filter state and search term
  const filteredTasks = tasks
    .filter((task) => {
      if (filter === "all") return true;
      if (filter === "completed" && task.completed) return true;
      if (filter === "pending" && !task.completed) return true;
      return false;
    })
    .filter((task) =>
      task.title && task.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

  useEffect(() => {
    fetchTasks();
  }, []); // Empty dependency array ensures this runs only once after the component mounts

  return (
    <div id="/todoapp">
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
              onEdit={editTaskHandler} // Add onEdit handler to TodoItem
            />
          ))}
        </ul>
      )}

      {/* Edit Task Form */}
      {editTask && (
        <div className="edit-task-form">
          <h3>Edit Task</h3>
          <input
            type="text"
            placeholder="Title"
            value={newTaskDetails.title}
            onChange={(e) =>
              setNewTaskDetails({ ...newTaskDetails, title: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Due Date"
            value={newTaskDetails.dueDate}
            onChange={(e) =>
              setNewTaskDetails({ ...newTaskDetails, dueDate: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Priority"
            value={newTaskDetails.priority}
            onChange={(e) =>
              setNewTaskDetails({ ...newTaskDetails, priority: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Notes"
            value={newTaskDetails.notes}
            onChange={(e) =>
              setNewTaskDetails({ ...newTaskDetails, notes: e.target.value })
            }
          />
          <button onClick={saveEditedTask}>Save</button>
          <button onClick={cancelEdit}>Cancel</button>
        </div>
      )}

      <AddTodoForm addTask={addTask} />
    </div>
  );
}

export default TodoList;
