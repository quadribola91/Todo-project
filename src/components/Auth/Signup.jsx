import React, { useState } from "react";
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase"; // Assuming firebase is correctly configured
import { useNavigate } from "react-router-dom"; // For redirect after signup

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // For redirect after successful sign up

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Email/Password Sign-Up
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("User signed up successfully");

      // Redirect to main page or login page
      navigate("/dashboard"); // Change to the appropriate route

    } catch (error) {
      setError(error.message);
      console.error("Error signing up:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    const provider = new GoogleAuthProvider();

    try {
      setLoading(true);
      // Google Sign-In Popup
      const result = await signInWithPopup(auth, provider);

      // You can get additional user info here if needed
      const user = result.user;
      console.log("Google user signed up:", user);

      // Redirect to the main page or dashboard
      navigate("/dashboard"); // Change to the appropriate route

    } catch (error) {
      setError(error.message);
      console.error("Error with Google sign-up:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="signup">
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
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
      </form>

      {/* Google Sign-Up Button */}
      <button onClick={handleGoogleSignUp} disabled={loading}>
        {loading ? "Signing Up with Google..." : "Sign Up with Google"}
      </button>
    </div>
  );
};

export default SignUp;
