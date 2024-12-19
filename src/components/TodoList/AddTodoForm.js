import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from '../firebase'; // Import Firebase Firestore and Auth

const AddTodoForm = () => {
  const [task, setTask] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("medium");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState(""); // To track errors

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if user is logged in
    if (!auth.currentUser) {
      setError("Please log in to add a task.");
      return;
    }

    const userId = auth.currentUser.uid;

    try {
      // Add task to Firestore under the user's unique collection
      await addDoc(collection(db, "users", userId, "taskList"), {
        title: task,
        dueDate: dueDate,
        completed: false,
        priority: priority,
        notes: notes,
        createdAt: new Date(),
      });

      console.log("Task added successfully");

      // Reset form fields
      setTask("");
      setDueDate("");
      setPriority("medium");
      setNotes("");
      setError(""); // Clear any errors

    } catch (error) {
      console.error("Error adding task: ", error);
      setError("Failed to add task. Please try again.");
    }
  };

  return (
    <div>
      <h2>Add Task</h2>
      
      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Task Name:</label>
          <input
            type="text"
            placeholder="Task Name"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Due Date:</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>

        <div>
          <label>Priority:</label>
          <select value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div>
          <label>Notes:</label>
          <textarea
            placeholder="Add any notes here"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        <div>
          <button type="submit">Add Task</button>
        </div>
      </form>
    </div>
  );
};

export default AddTodoForm;
