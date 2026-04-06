import React, { useEffect, useState } from "react";
import axios from "axios";
import Calendar from "react-calendar";
import AIChat from "./AIChat";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(new Date());
  const [activeTab, setActiveTab] = useState("tasks");
  const [darkMode, setDarkMode] = useState(false);
  const [notes, setNotes] = useState([]);
  const [noteText, setNoteText] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const getToken = () => localStorage.getItem("token");

  // ✅ CHECK TOKEN + FETCH
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/";
      return;
    }
    fetchTasks();
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

  // ✅ FETCH TASKS (SAFE)
  const fetchTasks = async () => {
    try {
      const res = await axios.get(
        "https://task-manager-backend-ynnb.onrender.com/api/tasks",
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
      setTasks(res.data);
    } catch (err) {
      console.log(err);
      if (err.response?.status === 401) {
        // Only redirect on actual auth failure
        alert("Session expired ❌ Login again");
        localStorage.removeItem("token");
        window.location.href = "/";
      } else {
        // Network error / server cold start / other errors
        alert("Failed to load tasks ❌ Please try again.");
      }
    }
  };

  // ✅ ADD TASK
  const addTask = async () => {
    if (!title) return;
    try {
      const res = await axios.post(
        "https://task-manager-backend-ynnb.onrender.com/api/tasks",
        { title },
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
      setTasks([...tasks, res.data]);
      setTitle("");
    } catch (err) {
      console.log(err);
      if (err.response?.status === 401) {
        alert("Session expired ❌ Login again");
        localStorage.removeItem("token");
        window.location.href = "/";
      } else {
        alert("Error adding task ❌");
      }
    }
  };

  // ✅ DELETE TASK
  const deleteTask = async (id) => {
    try {
      await axios.delete(
        `https://task-manager-backend-ynnb.onrender.com/api/tasks/${id}`,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
      setTasks(tasks.filter((t) => t._id !== id));
    } catch (err) {
      console.log(err);
      if (err.response?.status === 401) {
        alert("Session expired ❌ Login again");
        localStorage.removeItem("token");
        window.location.href = "/";
      } else {
        alert("Error deleting task ❌");
      }
    }
  };

  // ✅ NOTES
  const addNote = () => {
    if (!noteText) return;
    setNotes([...notes, noteText]);
    setNoteText("");
    setShowPopup(false);
  };

  const deleteNote = (i) => {
    setNotes(notes.filter((_, index) => index !== i));
  };

  // ✅ THEME
  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark");
  };

  // ✅ LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div>
      <button className="theme-btn" onClick={toggleTheme}>
        🌙
      </button>
      <div className="glass">
        {/* TASK TAB */}
        {activeTab === "tasks" && (
          <>
            <h2>🎀 Task Manager</h2>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter your task..."
            />
            <button onClick={addTask}>Add Task</button>
            {tasks.map((task) => (
              <div key={task._id} className="task-card">
                {task.title}
                <button onClick={() => deleteTask(task._id)}>❌</button>
              </div>
            ))}
          </>
        )}

        {/* NOTES TAB */}
        {activeTab === "notes" && (
          <>
            <h3>📝 Notes</h3>
            <button onClick={() => setShowPopup(true)}>+ Add</button>
            <div className="notes-container">
              {notes.map((note, i) => (
                <div key={i} className="note-card">
                  {note}
                  <button onClick={() => deleteNote(i)}>❌</button>
                </div>
              ))}
            </div>
          </>
        )}

        {/* CALENDAR TAB */}
        {activeTab === "calendar" && (
          <>
            <h3>📅 Calendar</h3>
            <Calendar value={date} onChange={setDate} />
          </>
        )}

        {/* AI CHAT */}
        {activeTab === "chat" && <AIChat />}
      </div>

      {/* POPUP */}
      {showPopup && (
        <div className="popup">
          <textarea
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
          />
          <button onClick={addNote}>Save</button>
        </div>
      )}

      {/* NAVBAR */}
      <div className="bottom-nav">
        <button onClick={() => setActiveTab("tasks")}>🏠</button>
        <button onClick={() => setActiveTab("notes")}>📝</button>
        <button onClick={() => setActiveTab("calendar")}>📅</button>
        <button onClick={() => setActiveTab("chat")}>🤖</button>
        <button onClick={logout}>🚪</button>
      </div>
    </div>
  );
}

export default Dashboard;