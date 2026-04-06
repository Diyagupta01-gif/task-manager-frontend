import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const { token } = useParams();

  const handleReset = async () => {
    if (!password) return alert("Enter new password ❗");

    try {
      await axios.post(
        `https://task-manager-backend-ynnb.onrender.com/api/auth/reset/${token}`,
        { password }
      );

      alert("Password updated successfully 🎉");

      window.location.href = "/";
    } catch (err) {
      alert("Error resetting password ❌");
    }
  };

  return (
    <div>
      <input
        type="password"
        placeholder="Enter new password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleReset}>
        Reset Password 🚀
      </button>
    </div>
  );
}

export default ResetPassword;