import React, { useState } from "react";
import axios from "axios";

function Register() {
  const [name, setName] = useState("");   // ✅ ADD
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      const res = await axios.post(
        "https://task-manager-backend-ynnb.onrender.com/api/auth/register",
        {
          name,   // ✅ ADD
          email,
          password,
        }
      );

      console.log("SUCCESS:", res.data);
      alert("Registered Successfully ✅");
    } catch (err) {
      console.log(err);
      alert("Registration Failed ❌");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Register</h2>

      {/* ✅ NAME FIELD */}
      <input
        placeholder="Enter name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br /><br />

      <input
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br /><br />

      <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br /><br />

      <button type="button" onClick={handleRegister}>
        Register
      </button>
    </div>
  );
}

export default Register;