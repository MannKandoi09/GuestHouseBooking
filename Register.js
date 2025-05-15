import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import "../styles/register.css";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Z]).{8,}$/;
    return regex.test(password);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!validatePassword(password)) {
      setError("Password must be at least 8 characters and contain one uppercase letter.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/guests/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        alert("Registration successful!");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setError("");
      } else if (response.status === 400) {
        throw new Error("User already exists.");
      } else {
        throw new Error("Registration failed.");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleRegister} className="register-form">
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
        <input
          type="password"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        {error && <p className="error">{error}</p>}
        <Button type="submit">Register</Button>
      </form>
      <p>
        Already have an account? <Link to="/">Login</Link>
      </p>
      <p className="forgot-password">
        <Link to="/forgot-password">Forgot Password?</Link>
      </p>
    </div>
  );
}

export default Register;
