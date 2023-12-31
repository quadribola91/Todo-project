// src/components/TodoList/TodoList.js
import React, { useState } from "react";
import "./TodoList.css";
import TodoItem from "../TodoItem/TodoItem";
import AddTodoForm from "../AddTodoForm/AddTodoForm";

function TodoList() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Task 1", dueDate: "2023-12-31", completed: false },
    { id: 2, title: "Task 2", dueDate: "2023-12-15", completed: true },
    // Add more tasks as needed
  ]);

  const addTask = (newTask, dueDate) => {
    setTasks([
      ...tasks,
      { id: tasks.length + 1, title: newTask, dueDate, completed: false },
    ]);
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const toggleTask = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div>
      <ul className="TodoList">
        {tasks.map((task) => (
          <TodoItem
            key={task.id}
            task={task}
            onDelete={deleteTask}
            onToggle={toggleTask}
          />
        ))}
      </ul>
      <AddTodoForm addTask={addTask} />
    </div>
  );
}

export default TodoList;
