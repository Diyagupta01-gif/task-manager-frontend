import React, { useState } from "react";
import axios from "axios";

function AIChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input) return;

    // show user message
    const userMsg = { role: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);

    const currentInput = input;
    setInput("");

    try {
      const res = await axios.post(
        "https://task-manager-backend-ynnb.onrender.com/api/chat",   // ✅ FIXED URL
        { message: currentInput }
      );

      const botMsg = {
        role: "bot",
        text: res.data.reply,
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      console.log(error);

      const botMsg = {
        role: "bot",
        text: "AI error ❌",
      };

      setMessages((prev) => [...prev, botMsg]);
    }
  };

  return (
    <div style={styles.container}>
      <h3>🤖 AI Assistant</h3>

      <div style={styles.chatBox}>
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              textAlign: msg.role === "user" ? "right" : "left",
              margin: "10px 0",
            }}
          >
            <span
              style={{
                background: msg.role === "user" ? "#ff7eb3" : "#eee",
                color: msg.role === "user" ? "white" : "black",
                padding: "8px 12px",
                borderRadius: "10px",
                display: "inline-block",
              }}
            >
              {msg.text}
            </span>
          </div>
        ))}
      </div>

      <div style={styles.inputBox}>
        <input
          type="text"
          placeholder="Ask anything..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={styles.input}
        />
        <button onClick={sendMessage} style={styles.button}>
          Send
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  chatBox: {
    flex: 1,
    overflowY: "auto",
    background: "#fff",
    padding: "10px",
    borderRadius: "10px",
    marginBottom: "10px",
  },
  inputBox: {
    display: "flex",
    gap: "10px",
  },
  input: {
    flex: 1,
    padding: "8px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "8px 15px",
    background: "#ff7eb3",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
};

export default AIChat;