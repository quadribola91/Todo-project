// FolderList.jsx
import React from 'react';

const FolderList = ({ folders }) => {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">Folders</h2>
      <ul className="space-y-4">
        {folders.map(folder => (
          <li
            key={folder.id}
            className="flex justify-between items-center p-4 bg-blue-100 rounded hover:bg-blue-200 cursor-pointer"
          >
            <span>{folder.name}</span>
            <span className="text-sm text-gray-500">{folder.todos.length} Todos</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FolderList;
