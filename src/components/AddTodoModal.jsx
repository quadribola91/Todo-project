// AddTodoModal.jsx
import React, { useState } from 'react';

const AddTodoModal = ({ isOpen, onClose, onAdd }) => {
  const [text, setText] = useState('');
  const [folder, setFolder] = useState('');

  const handleAdd = () => {
    if (text) {
      onAdd({ text, folder, completed: false, id: Date.now() });
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Add New Todo</h2>
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded mb-4"
          placeholder="Enter todo text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded mb-4"
          placeholder="Enter folder name"
          value={folder}
          onChange={(e) => setFolder(e.target.value)}
        />
        <div className="flex justify-end">
          <button
            onClick={handleAdd}
            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
          >
            Add Todo
          </button>
          <button
            onClick={onClose}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTodoModal;
