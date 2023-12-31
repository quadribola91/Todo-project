// src/components/AddTodoForm/AddTodoForm.js
import React, { useState } from "react";
import "./AddTodoForm.css";

function AddTodoForm({ addTask }) {
  const [newTask, setNewTask] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTask.trim() !== "") {
      addTask(newTask.trim(), dueDate);
      setNewTask("");
      setDueDate("");
    }
  };

  return (
    <form className="AddTodoForm" onSubmit={handleSubmit}>
      <div className="input-group">
        <input
          type="text"
          placeholder="Add a new task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <input
          type="date"
          placeholder="Due date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <button type="submit">Add</button>
      </div>
    </form>
  );
}

export default AddTodoForm;
