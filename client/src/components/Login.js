import React, { useState } from "react";
import "./Login.css";

const Login = ({ onLoginSuccess }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const endpoint = isRegistering ? "/api/auth/register" : "/api/auth/login";

    try {
      const res = await fetch(`http://localhost:5000${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("userEmail", data.email || email);
        localStorage.removeItem("guest");
        setSuccess(isRegistering ? "Registration successful! Logging in..." : "Login successful!");
        onLoginSuccess?.();
      } else {
        setError(data.message || "Something went wrong.");
      }
    } catch (err) {
      console.error("Auth error:", err);
      setError("Network error. Please try again.");
    }
  };

  const handleGuestAccess = () => {
    localStorage.setItem("guest", "true");
    localStorage.removeItem("userEmail");
    onLoginSuccess?.();
  };

  return (
    <div className="login-container">
      <h2>{isRegistering ? "Register" : "Login"} to Cost Splitter 💸</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">{isRegistering ? "Register" : "Login"}</button>
      </form>

      <button
        type="button"
        className="guest-button"
        onClick={handleGuestAccess}
        style={{ marginTop: "10px", backgroundColor: "#ccc", border: "none", padding: "10px", cursor: "pointer" }}
      >
        Continue Without Logging In
      </button>

      <p style={{ marginTop: "10px" }}>
        {isRegistering ? "Already have an account?" : "Don't have an account?"}{" "}
        <button
          type="button"
          onClick={() => setIsRegistering(!isRegistering)}
          style={{ background: "none", border: "none", color: "blue", textDecoration: "underline", cursor: "pointer" }}
        >
          {isRegistering ? "Login" : "Register"}
        </button>
      </p>

      {error && <p className="login-error" style={{ color: "red" }}>{error}</p>}
      {success && <p className="login-success" style={{ color: "green" }}>{success}</p>}
    </div>
  );
};

export default Login;
