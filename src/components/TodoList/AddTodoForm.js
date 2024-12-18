// src/components/TodoList/AddTodoForm.js
import React, { useState } from "react";

function AddTodoForm({ addTask, editTask, taskToEdit }) {
  const [task, setTask] = useState(taskToEdit ? taskToEdit.title : "");
  const [dueDate, setDueDate] = useState(taskToEdit ? taskToEdit.dueDate : "");
  const [priority, setPriority] = useState(taskToEdit ? taskToEdit.priority : "medium");
  const [notes, setNotes] = useState(taskToEdit ? taskToEdit.notes : "");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskToEdit) {
      // Update the existing task
      editTask(taskToEdit.id, task, dueDate, priority, notes);
    } else {
      // Add a new task
      addTask(task, dueDate, priority, notes);
    }
    setTask("");
    setDueDate("");
    setPriority("medium");
    setNotes("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Task Name"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        required
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <textarea
        placeholder="Add notes..."
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />
      <button type="submit">{taskToEdit ? "Save Changes" : "Add Task"}</button>
    </form>
  );
}

export default AddTodoForm;
