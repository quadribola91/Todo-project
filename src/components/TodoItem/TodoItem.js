// src/components/TodoItem/TodoItem.js
import React, { useState } from "react";
import AddTodoForm from "../TodoList/AddTodoForm";

function TodoItem({ task, onDelete, onToggle }) {
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = (updatedTask) => {
    setIsEditing(false);
    // Update task in TodoList
    onToggle(task.id); // Reapply the same task changes (could be more advanced in a real app)
  };

  return (
    <li>
      {isEditing ? (
        <AddTodoForm
          taskToEdit={task}
          editTask={handleSave}
        />
      ) : (
        <>
          <div style={{ textDecoration: task.completed ? "line-through" : "none" }}>
            <p>{task.title}</p>
            <p>{task.dueDate}</p>
            <p>{task.priority}</p>
            <p>{task.notes}</p>
          </div>
          <button onClick={() => onToggle(task.id)}>
            {task.completed ? "Mark as Pending" : "Mark as Completed"}
          </button>
          <button onClick={handleEdit}>Edit</button>
          <button onClick={() => onDelete(task.id)}>Delete</button>
        </>
      )}
    </li>
  );
}

export default TodoItem;
