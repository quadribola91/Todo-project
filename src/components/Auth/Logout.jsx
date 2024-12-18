import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase"; // Assuming the firebase configuration is correct
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirecting

const Logout = () => {
  const navigate = useNavigate(); // Initialize useNavigate for redirection

  const handleLogout = async () => {
    try {
      await signOut(auth); // Sign the user out from Firebase
      console.log("User logged out successfully");

      // Redirect the user to the login page after logging out
      navigate("/login"); // Assuming the login page is at '/login'
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  return (
    <div id="logout">
      <button onClick={handleLogout}>Log Out</button>
    </div>
  );
};

export default Logout;
