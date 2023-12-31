// src/components/TodoItem/TodoItem.js
import React from "react";
import "./TodoItem.css";

function TodoItem({ task, onDelete, onToggle }) {
  const handleDelete = () => {
    onDelete(task.id);
  };

  const handleToggle = () => {
    onToggle(task.id);
  };

  return (
    <li className={`TodoItem ${task.completed ? "completed" : ""}`}>
      <span>{task.title}</span>
      <span>{task.dueDate ? `Due: ${task.dueDate}` : ""}</span>
      <button onClick={handleToggle}>
        {task.completed ? "Undo" : "Complete"}
      </button>
      <button onClick={handleDelete}>Delete</button>
    </li>
  );
}

export default TodoItem;
