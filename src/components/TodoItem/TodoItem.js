import React from "react";

function TodoItem({ task, onDelete, onToggle, onEdit }) {
  return (
    <li>
      <span
        style={{ textDecoration: task.completed ? "line-through" : "none" }}
        onClick={() => onToggle(task.id, task.completed)}
      >
        {task.title}
      </span>
      <button onClick={() => onEdit(task)}>Edit</button>
      <button onClick={() => onDelete(task.id)}>Delete</button>
    </li>
  );
}

export default TodoItem;
