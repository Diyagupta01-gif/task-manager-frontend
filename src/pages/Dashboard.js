import React, { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const fetchTasks = async () => {
    try {
      const res = await axios.get(
        "https://task-manager-backend-ynnb.onrender.com/api/tasks",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTasks(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleAdd = async () => {
    if (!title) return;

    try {
      setLoading(true);

      await axios.post(
        "https://task-manager-backend-ynnb.onrender.com/api/tasks",
        { title },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTitle("");
      fetchTasks();
    } catch (err) {
      console.log(err);
      alert("Task add failed ❌");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="container">
      <div className="card">
        <h1>Task Manager 🚀</h1>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task"
        />

        <button onClick={handleAdd} disabled={loading}>
          {loading ? "Adding..." : "Add Task"}
        </button>

        <h3 style={{ marginTop: "20px" }}>My Tasks</h3>

        {tasks.length === 0 ? (
          <p>No tasks yet</p>
        ) : (
          tasks.map((task) => (
            <div key={task._id} className="task">
              {task.title}
            </div>
          ))
        )}

        <button
          onClick={handleLogout}
          style={{ marginTop: "15px", background: "#ff4d4d" }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Dashboard;