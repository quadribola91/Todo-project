import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase"; // Assuming firebase is correctly configured

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // To handle loading state

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading before trying to sign up

    try {
      // Create user with email and password
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("User signed up successfully");

      // Redirect user to login or main page (you can change this)
      // You can use useNavigate to go to the desired route after sign-up
    } catch (error) {
      setError(error.message); // Set error message on failure
      console.error("Error signing up:", error.message);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSignUp}>
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
          {loading ? "Signing Up..." : "Sign Up"} {/* Show loading text if signing up */}
        </button>
      </form>
    </div>
  );
};

export default SignUp;
