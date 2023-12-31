// src/components/TodoApp/TodoApp.js
import React, { useState } from "react";
import "./TodoApp.css";

function TodoApp() {
  const [todoInput, setTodoInput] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [dueDate, setDueDate] = useState("");

  const handleInputChange = (e) => {
    setTodoInput(e.target.value);
  };

  const handleDueDateChange = (e) => {
    setDueDate(e.target.value);
  };

  const handleAddTodo = () => {
    if (todoInput.trim() !== "") {
      if (editIndex !== null) {
        // If editIndex is not null, update the existing todo
        const updatedTodoList = [...todoList];
        updatedTodoList[editIndex] = { text: todoInput, dueDate };
        setTodoList(updatedTodoList);
        setEditIndex(null);
      } else {
        // Add a new todo
        setTodoList([...todoList, { text: todoInput, dueDate }]);
      }

      // Clear the input and due date
      setTodoInput("");
      setDueDate("");
    }
  };

  const handleEditTodo = (index) => {
    // Set the input and due date to the selected todo item and switch to edit mode
    setTodoInput(todoList[index].text);
    setDueDate(todoList[index].dueDate);
    setEditIndex(index);
  };

  const handleDeleteTodo = (index) => {
    // Remove the selected todo item
    const updatedTodoList = [...todoList];
    updatedTodoList.splice(index, 1);
    setTodoList(updatedTodoList);

    // Clear the input, due date, and exit edit mode
    setTodoInput("");
    setDueDate("");
    setEditIndex(null);
  };

  const handleKeyPress = (e) => {
    // Handle Enter key press to add todo
    if (e.key === "Enter") {
      handleAddTodo();
    }
  };

  const handleDragStart = (e, index) => {
    // Set the data to be dragged (in this case, the todo text)
    e.dataTransfer.setData("text/plain", JSON.stringify(todoList[index]));
  };

  const handleDragOver = (e) => {
    // Allow a drop
    e.preventDefault();
  };

  const handleDrop = (e) => {
    // Handle the drop action
    e.preventDefault();
    const droppedTodo = JSON.parse(e.dataTransfer.getData("text/plain"));

    // Add the dropped todo to the list
    setTodoList([...todoList, droppedTodo]);
  };

  return (
    <div className="TodoAppContainer">
      <div className="TodoApp" onDragOver={handleDragOver} onDrop={handleDrop}>
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
          {todoList.map((todo, index) => (
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
