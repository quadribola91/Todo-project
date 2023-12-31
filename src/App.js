// src/App.js
import React, { useState } from "react";
import TodoApp from "./components/TodoApp/TodoApp";
import Navbar from "./components/Navbar/Navbar";
import Clock from "./components/Clock/Clock";
import Footer from "./components/Footer/Footer";
import FolderSection from "./components/FolderSection/FolderSection";
import Discover from "./components/Discover/Discover";

function App() {
  const [theme, setTheme] = useState("light"); // Add state for theme
  const [isNavOpen, setIsNavOpen] = useState(false); // State for mobile navigation

  const toggleTheme = () => {
    // Toggle between 'light' and 'dark' themes
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const toggleNav = () => {
    // Toggle mobile navigation
    setIsNavOpen((prevIsNavOpen) => !prevIsNavOpen);
  };
  const [folders, setFolders] = useState([]);
  const [newFolderName, setNewFolderName] = useState("");

  const handleNewFolderNameChange = (e) => {
    setNewFolderName(e.target.value);
  };

  const handleAddFolder = () => {
    if (newFolderName.trim() !== "") {
      setFolders([...folders, { name: newFolderName, todos: [] }]);
      setNewFolderName("");
    }
  };

  const handleFolderKeyPress = (e) => {
    // Handle Enter key press to add folder
    if (e.key === "Enter") {
      handleAddFolder();
    }
  };

  return (
    <div className={`App ${theme}`}>
      <Navbar
        toggleTheme={toggleTheme}
        toggleNav={toggleNav}
        isNavOpen={isNavOpen}
      />
      <Clock />
      <main>
        <TodoApp />
        <FolderSection
          folders={folders}
          setFolders={setFolders}
          handleFolderKeyPress={handleFolderKeyPress}
        />
      </main>
      <Discover />
      <Footer />
    </div>
  );
}

export default App;
