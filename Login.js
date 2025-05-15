import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import "../styles/login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/guests/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        alert("Login successful!");
        console.log(data);
      } else if (response.status === 404) {
        throw new Error("User not found");
      } else if (response.status === 401) {
        throw new Error("Incorrect password");
      } else {
        throw new Error("Login failed");
      }
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin} className="login-form">
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
        <Button type="submit">Login</Button>
      </form>
      <p>
        Don't have an account? <Link to="/register"><b>Register</b></Link>
      </p>
    </div>
  );
}

export default Login;
