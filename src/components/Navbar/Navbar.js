// src/components/Navbar/Navbar.js
import React from "react";
import "./Navbar.css";
import pic from "./highC.jpeg";

function Navbar({ toggleTheme }) {
  return (
    <div className="Navbar">
      <div className="Left">
        <img src={pic} style={{ width: "40px", borderRadius: "50px" }} />
        <div className="HeaderName">TodoApp</div>
      </div>
      <button onClick={toggleTheme} className="ThemeToggle">
        {/* Use an icon or text for the button */}
        🌞🌜
      </button>
      <div className="Right">
        <div className="NavItem">
          <a href="#Discover">Discover</a>
        </div>

        <div className="Button">TodoApp</div>
      </div>
    </div>
  );
}

export default Navbar;
