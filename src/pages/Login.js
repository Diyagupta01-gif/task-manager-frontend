import React, { useState } from "react";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "https://task-manager-backend-ynnb.onrender.com/api/auth/login",
        {
          email,
          password,
        }
      );

      // ✅ correct check
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        window.location.href = "/dashboard"; // redirect after login
      } else {
        alert("Invalid credentials ❌");
      }
    } catch (err) {
      console.log(err);
      alert("Login failed ❌");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Task Manager 🚀</h1>
        <h3>Login</h3>

        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}

export default Login;