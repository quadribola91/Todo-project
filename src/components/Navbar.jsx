import React, { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-sky-500 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Brand Name */}
        <h1 className="text-2xl font-bold">Todo App</h1>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-10">
          <a
            href="/"
            className="hover:bg-blue-700 px-4 py-2 rounded transition-all"
          >
            Home
          </a>
          <a
            href="#todos"
            className="hover:bg-blue-700 px-4 py-2 rounded transition-all"
          >
            Todos
          </a>
          <a
            href="#folders"
            className="hover:bg-blue-700 px-4 py-2 rounded transition-all"
          >
            Folders
          </a>
          <a
            href="#login"
            className="hover:bg-blue-700 px-4 py-2 rounded transition-all"
          >
            Login
          </a>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            aria-label="Toggle menu"
            className="focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-blue-700 text-white p-4 space-y-4 mt-2">
          <a
            href="/"
            className="block hover:bg-blue-600 px-4 py-2 rounded transition-all"
          >
            Home
          </a>
          <a
            href="#todos"
            className="block hover:bg-blue-600 px-4 py-2 rounded transition-all"
          >
            Todos
          </a>
          <a
            href="#folders"
            className="block hover:bg-blue-600 px-4 py-2 rounded transition-all"
          >
            Folders
          </a>
          <a
            href="#login"
            className="block hover:bg-blue-600 px-4 py-2 rounded transition-all"
          >
            Login
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
