// src/components/TodoApp/TodoApp.js
import React, { useState } from "react";
import "./TodoApp.css";
import Filter from "../Filter/Filter";

function TodoApp() {
  const [todoInput, setTodoInput] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [dueDate, setDueDate] = useState("");
  const [currentFilter, setCurrentFilter] = useState("all");

  const handleInputChange = (e) => {
    setTodoInput(e.target.value);
  };

  const handleDueDateChange = (e) => {
    setDueDate(e.target.value);
  };

  const handleAddTodo = () => {
    if (todoInput.trim() !== "") {
      if (editIndex !== null) {
        const updatedTodoList = [...todoList];
        updatedTodoList[editIndex] = { text: todoInput, dueDate };
        setTodoList(updatedTodoList);
        setEditIndex(null);
      } else {
        setTodoList([...todoList, { text: todoInput, dueDate }]);
      }

      setTodoInput("");
      setDueDate("");
    }
  };

  const handleEditTodo = (index) => {
    setTodoInput(todoList[index].text);
    setDueDate(todoList[index].dueDate);
    setEditIndex(index);
  };

  const handleDeleteTodo = (index) => {
    const updatedTodoList = [...todoList];
    updatedTodoList.splice(index, 1);
    setTodoList(updatedTodoList);

    setTodoInput("");
    setDueDate("");
    setEditIndex(null);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAddTodo();
    }
  };

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("text/plain", JSON.stringify(todoList[index]));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedTodo = JSON.parse(e.dataTransfer.getData("text/plain"));

    setTodoList([...todoList, droppedTodo]);
  };

  const handleFilterChange = (filter) => {
    setCurrentFilter(filter);
  };

  const filterTodoList = () => {
    switch (currentFilter) {
      case "all":
        return todoList;
      case "completed":
        return todoList.filter((todo) => new Date(todo.dueDate) < new Date());
      case "incomplete":
        return todoList.filter((todo) => new Date(todo.dueDate) >= new Date());
      default:
        return todoList;
    }
  };

  const filteredTodoList = filterTodoList();

  return (
    <div className="TodoAppContainer">
      <div className="TodoApp" onDragOver={handleDragOver} onDrop={handleDrop}>
        <Filter
          currentFilter={currentFilter}
          onFilterChange={handleFilterChange}
        />
        <div className="InputContainer">
          <input
            type="text"
            placeholder="Add a new todo..."
            value={todoInput}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
          />
          <input
            type="date"
            value={dueDate}
            onChange={handleDueDateChange}
            style={{ width: "20px", padding: "10px", marginLeft: "30px" }}
          />
          <button onClick={handleAddTodo}>
            {editIndex !== null ? "Update Todo" : "Add Todo"}
          </button>
        </div>
        <ul>
          {filteredTodoList.map((todo, index) => (
            <li
              key={index}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
            >
              {todo.text}
              <span>
                Due Date: {new Date(todo.dueDate).toLocaleDateString()}
                <button onClick={() => handleEditTodo(index)}>Edit</button>
                <button onClick={() => handleDeleteTodo(index)}>Delete</button>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TodoApp;
