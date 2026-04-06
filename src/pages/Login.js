import React, { useState } from "react";
import axios from "axios";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    console.log("🔵 LOGIN BUTTON CLICKED");
    console.log("📧 Email:", email);
    console.log("🔑 Password length:", password.length);

    if (!email || !password) {
      alert("Enter email & password");
      return;
    }

    setLoading(true);
    try {
      console.log("📡 Sending login request to backend...");
      const res = await axios.post(
        "https://task-manager-backend-ynnb.onrender.com/api/auth/login",
        { email, password }
      );

      console.log("✅ LOGIN RESPONSE:", res.data);
      console.log("🪙 Token received:", res.data.token ? "YES" : "NO");

      if (!res.data.token) {
        console.error("❌ No token in response!");
        alert("Login failed ❌ No token received");
        return;
      }

      localStorage.setItem("token", res.data.token);
      console.log("💾 Token saved to localStorage:", localStorage.getItem("token"));
      console.log("✅ Redirecting to dashboard in 500ms...");

      alert("Login success ✅");
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 500);
    } catch (err) {
      console.error("❌ LOGIN ERROR:", err);
      console.error("❌ Status:", err.response?.status);
      console.error("❌ Error data:", err.response?.data);
      alert(`Login failed ❌ ${err.response?.data?.message || err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    console.log("🔵 GOOGLE LOGIN CLICKED");
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("✅ Firebase user:", user.email);

      // Get Firebase ID token
      const firebaseToken = await user.getIdToken();
      console.log("🪙 Firebase token received:", firebaseToken ? "YES" : "NO");

      // ⚠️ Send Firebase token to YOUR backend to get a backend JWT
      console.log("📡 Sending Firebase token to backend for verification...");
      const res = await axios.post(
        "https://task-manager-backend-ynnb.onrender.com/api/auth/google",
        { token: firebaseToken }
      );

      console.log("✅ Backend Google login response:", res.data);

      if (!res.data.token) {
        console.error("❌ No backend token received for Google login!");
        alert("Google Login failed ❌ Backend did not return a token");
        return;
      }

      localStorage.setItem("token", res.data.token);
      console.log("💾 Backend token saved:", localStorage.getItem("token"));
      alert("Google Login Success 🚀");
      window.location.href = "/dashboard";
    } catch (err) {
      console.error("❌ GOOGLE LOGIN ERROR:", err);
      console.error("❌ Status:", err.response?.status);
      console.error("❌ Error data:", err.response?.data);
      alert(`Google Login failed ❌ ${err.response?.data?.message || err.message}`);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.glow1}></div>
      <div style={styles.glow2}></div>
      <div style={styles.card}>
        <h2 style={styles.title}>✨ Welcome Back</h2>
        <p style={styles.subtitle}>Smart Task Manager</p>
        <input
          type="email"
          placeholder="📧 Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />
        <div style={{ position: "relative" }}>
          <input
            type={showPass ? "text" : "password"}
            placeholder="🔒 Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />
          <span onClick={() => setShowPass(!showPass)} style={styles.eye}>
            {showPass ? "🙈" : "👁️"}
          </span>
        </div>

        <div style={styles.row}>
          <span
            style={styles.forgot}
            onClick={() => (window.location.href = "/forgot")}
          >
            Forgot Password?
          </span>
        </div>

        <button onClick={handleLogin} style={styles.button} disabled={loading}>
          {loading ? "Logging in..." : "Login 🚀"}
        </button>

        <button onClick={handleGoogleLogin} style={styles.button}>
          Continue with Google
        </button>

        <p style={{ marginTop: "10px" }}>
          Don't have an account?{" "}
          <span
            style={styles.link}
            onClick={() => (window.location.href = "/register")}
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#0f0f1a",
    position: "relative",
    overflow: "hidden",
  },
  glow1: {
    position: "absolute",
    width: "400px",
    height: "400px",
    background: "#ff69b4",
    borderRadius: "50%",
    filter: "blur(120px)",
    top: "-100px",
    left: "-100px",
  },
  glow2: {
    position: "absolute",
    width: "400px",
    height: "400px",
    background: "#a084dc",
    borderRadius: "50%",
    filter: "blur(120px)",
    bottom: "-100px",
    right: "-100px",
  },
  card: {
    width: "340px",
    padding: "30px",
    borderRadius: "20px",
    background: "rgba(255,255,255,0.08)",
    backdropFilter: "blur(20px)",
    boxShadow: "0 10px 40px rgba(0,0,0,0.4)",
    textAlign: "center",
    color: "white",
  },
  title: { marginBottom: "5px" },
  subtitle: { opacity: 0.6, marginBottom: "20px" },
  input: {
    width: "100%",
    padding: "12px",
    margin: "10px 0",
    borderRadius: "10px",
    border: "1px solid rgba(255,255,255,0.2)",
    background: "transparent",
    color: "white",
    outline: "none",
  },
  eye: { position: "absolute", right: "15px", top: "18px", cursor: "pointer" },
  row: {
    display: "flex",
    justifyContent: "flex-end",
    fontSize: "14px",
    marginBottom: "10px",
  },
  forgot: { color: "#ff69b4", cursor: "pointer" },
  button: {
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    background: "linear-gradient(135deg,#ff69b4,#a084dc)",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: "10px",
  },
  link: { color: "#ff69b4", cursor: "pointer", fontWeight: "bold" },
};

export default Login;