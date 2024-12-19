import React, { useState, useEffect } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../firebase'; // Assuming you have this set up

const TodoList = () => {
  const [todos, setTodos] = useState([]);  // Initialize todos as an empty array

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "todos"));
        const todosList = querySnapshot.docs.map(doc => doc.data());
        setTodos(todosList);  // Set the fetched todos
      } catch (error) {
        console.error("Error fetching data: ", error);
        setTodos([]);  // Set an empty array in case of error
      }
    };

    fetchData();
  }, []);

  if (!Array.isArray(todos) || todos.length === 0) {
    return <div>No todos available</div>;  // Show a message if no todos are available
  }

  return (
    <ul>
      {todos.map((todo, index) => (
        <li key={index}>
          {todo.text} {/* Assuming each todo has a 'text' field */}
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
