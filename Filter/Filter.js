import React from "react";

const Filter = ({ currentFilter, onFilterChange }) => {
  const handleFilterChange = (filter) => {
    onFilterChange(filter);
  };

  return (
    <div className="flex items-center space-x-4">
      <span className="text-gray-700">Filter:</span>
      <button
        onClick={() => handleFilterChange("all")}
        className={`px-4 py-2 rounded ${
          currentFilter === "all" ? "bg-blue-500 text-white" : "bg-gray-300"
        }`}
      >
        All
      </button>
      <button
        onClick={() => handleFilterChange("completed")}
        className={`px-4 py-2 rounded ${
          currentFilter === "completed"
            ? "bg-blue-500 text-white"
            : "bg-gray-300"
        }`}
      >
        Completed
      </button>
      <button
        onClick={() => handleFilterChange("incomplete")}
        className={`px-4 py-2 rounded ${
          currentFilter === "incomplete"
            ? "bg-blue-500 text-white"
            : "bg-gray-300"
        }`}
      >
        Incomplete
      </button>
    </div>
  );
};

export default Filter;
