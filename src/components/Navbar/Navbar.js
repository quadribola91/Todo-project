import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link for routing
import "./Navbar.css";
import pic from "./highC.jpeg";
import { FaBars, FaTimes } from "react-icons/fa"; // Import both the hamburger (FaBars) and close (FaTimes) icons

function Navbar() {
  const [isOpen, setIsOpen] = useState(false); // State to toggle the menu
  const toggleMenu = () => setIsOpen(prevState => !prevState); // Toggle the menu on click

  return (
    <div className="Navbar">
      <div className="Left">
        <img
          src={pic}
          alt="logo"
          style={{ width: "40px", borderRadius: "50px" }}
        />
        <div className="HeaderName">TodoApp</div>
      </div>

      {/* Desktop Menu */}
      <div className={`Right ${isOpen ? "open" : ""}`}>
        <div className="NavItem">
          <Link to="/discover">Discover</Link>
        </div>
        <div className="NavItem">
          <Link to="/features">Features</Link>
        </div>
        <div className="NavItem">
          <Link to="/about">About</Link>
        </div>
        <div className="NavItem">
          <Link to="/contact">Contact</Link>
        </div>
        <div className="Button">
          <Link to="/todoapp">TodoApp</Link>
        </div>
      </div>

      {/* Mobile Menu Button (Hamburger Icon) */}
      <div className="MobileMenuIcon" onClick={toggleMenu}>
        {isOpen ? (
          <FaTimes size={30} color="white" /> // Show X icon when menu is open
        ) : (
          <FaBars size={30} color="white" /> // Show Hamburger icon when menu is closed
        )}
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="MobileMenu">
          <div className="NavItem">
            <Link to="/discover">Discover</Link>
          </div>
          <div className="NavItem">
            <Link to="/features">Features</Link>
          </div>
          <div className="NavItem">
            <Link to="/about">About</Link>
          </div>
          <div className="NavItem">
            <Link to="/contact">Contact</Link>
          </div>
          <div className="Button">
            <Link to="/todoapp">TodoApp</Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
