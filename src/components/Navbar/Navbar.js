import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link for routing
import "./Navbar.css";
import pic from "./highC.jpeg";
import { FaBars, FaTimes } from "react-icons/fa"; // Import both the hamburger (FaBars) and close (FaTimes) icons

function Navbar() {
  const [isOpen, setIsOpen] = useState(false); // State to toggle the menu visibility

  const toggleMenu = () => setIsOpen(prevState => !prevState); // Toggle the menu on button click

  // Handle menu close and icon change when a link is clicked
  const handleLinkClick = () => {
    setIsOpen(false); // Close the mobile menu when a link is clicked
  };

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
      <div className="Right">
        <div className="NavItem">
          <Link to="/discover" onClick={handleLinkClick}>Discover</Link>
        </div>
        <div className="NavItem">
          <Link to="/features" onClick={handleLinkClick}>Features</Link>
        </div>
        <div className="NavItem">
          <Link to="/contact" onClick={handleLinkClick}>Contact</Link>
        </div>
        <div className="Button">
          <Link to="/todoapp" onClick={handleLinkClick}>TodoApp</Link>
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
      <div className={`MobileMenu ${isOpen ? "open" : ""}`}>
        <div className="NavItem">
          <Link to="/discover" onClick={handleLinkClick}>Discover</Link>
        </div>
        <div className="NavItem">
          <Link to="/features" onClick={handleLinkClick}>Features</Link>
        </div>
        <div className="NavItem">
          <Link to="/contact" onClick={handleLinkClick}>Contact</Link>
        </div>
        <div className="Button">
          <Link to="/todoapp" onClick={handleLinkClick}>TodoApp</Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
