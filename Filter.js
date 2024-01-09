// src/components/Filter.js
import React from "react";

const Filter = ({ onFilterChange }) => {
  const handleFilterChange = (filter) => {
    onFilterChange(filter);
  };

  return (
    <div className="flex space-x-4 mt-4">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => handleFilterChange("all")}
      >
        All
      </button>
      <button
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => handleFilterChange("completed")}
      >
        Completed
      </button>
      <button
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => handleFilterChange("uncompleted")}
      >
        Uncompleted
      </button>
    </div>
  );
};

export default Filter;
