// src/components/FolderSection/FolderSection.js
import React, { useState } from "react";
import "./FolderSection.css";

function FolderSection() {
  const [folders, setFolders] = useState([]);
  const [newFolderName, setNewFolderName] = useState("");

  const handleInputChange = (e) => {
    setNewFolderName(e.target.value);
  };

  const handleAddFolder = () => {
    if (newFolderName.trim() !== "") {
      setFolders([...folders, { name: newFolderName, todoList: [] }]);
      setNewFolderName("");
    }
  };

  return (
    <div className="FolderSectionContainer">
      <h2>Folders</h2>
      <div className="FolderInputContainer">
        <input
          type="text"
          placeholder="New Folder Name"
          value={newFolderName}
          onChange={handleInputChange}
        />
        <button onClick={handleAddFolder}>Add Folder</button>
      </div>
      <ul>
        {folders.map((folder, index) => (
          <li key={index}>
            {folder.name} ({folder.todoList.length} Todos)
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FolderSection;
