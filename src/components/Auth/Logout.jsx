import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase"; // Assuming the firebase configuration is correct

const Logout = () => {
  const handleLogout = async () => {
    try {
      await signOut(auth); // Sign the user out from Firebase
      console.log("User logged out successfully");

      // You can redirect the user to the login page after logging out
      // Use useNavigate for redirection
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  return (
    <div>
      <button onClick={handleLogout}>Log Out</button>
    </div>
  );
};

export default Logout;
