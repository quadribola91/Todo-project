import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase"; // Assuming the firebase.js file is correctly set up

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // To store error messages
  const [loading, setLoading] = useState(false); // To manage loading state

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading before trying to log in

    try {
      // Sign in with email and password
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Logged in successfully");

      // Redirect the user to the protected route after successful login
      // You can use history.push or React Router's navigate function here

    } catch (error) {
      setError(error.message); // Display the error message if login fails
      console.error("Error logging in:", error.message);
    } finally {
      setLoading(false); // Stop loading regardless of success or failure
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>} {/* Display error message */}
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"} {/* Show loading text if logging in */}
        </button>
      </form>
    </div>
  );
};

export default Login;
