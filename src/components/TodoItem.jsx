// TodoItem.jsx
import React, { useState } from 'react';

const TodoItem = ({ todo }) => {
  const [completed, setCompleted] = useState(todo.completed);

  const handleToggle = () => setCompleted(!completed);

  return (
    <li className={`flex justify-between items-center p-4 rounded border ${completed ? 'bg-green-100 line-through' : 'bg-white'}`}>
      <span className="text-lg">{todo.text}</span>
      <button
        onClick={handleToggle}
        className={`px-4 py-2 rounded ${completed ? 'bg-red-500' : 'bg-green-500'} text-white`}
      >
        {completed ? 'Undo' : 'Done'}
      </button>
    </li>
  );
};

export default TodoItem;
