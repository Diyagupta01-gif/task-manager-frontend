import React, { useState } from "react";
import axios from "axios";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = async () => {
    if (!email) return alert("Enter email ❗");

    try {
      const res = await axios.post(
        "https://task-manager-backend-ynnb.onrender.com/api/auth/forgot",
        { email }
      );

      alert("Reset link sent to email 📧");
    } catch {
      alert("Error ❌");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Forgot Password 🔐</h2>

      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br /><br />

      <button onClick={handleSubmit}>
        Send Reset Link 🚀
      </button>
    </div>
  );
}

export default ForgotPassword;