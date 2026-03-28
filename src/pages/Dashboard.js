import React, { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const API = "https://task-manager-backend-ynnnb.onrender.com/api/tasks";

  // ✅ GET TASKS
  const fetchTasks = async () => {
    try {
      setLoading(true);

      const res = await axios.get(API, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTasks(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ ADD TASK
  const addTask = async () => {
    if (!title.trim()) {
      alert("Task cannot be empty ❌");
      return;
    }

    try {
      await axios.post(
        API,
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
    }
  };

  // ✅ DELETE TASK
  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchTasks();
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  useEffect(() => {
    fetchTasks();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="container">
      <h1 className="title">
        <span className="title-badge">Task Manager</span>
      </h1>

      {/* ADD TASK */}
      <div className="add-task">
        <input
          type="text"
          placeholder="Enter task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button onClick={addTask}>Add</button>
      </div>

      {/* TASK LIST */}
      <h3>My Tasks</h3>

      {loading ? (
        <p>Loading...</p>
      ) : (
        tasks.map((task) => (
          <div key={task._id} className="task">
            <span>{task.title}</span>
            <button onClick={() => deleteTask(task._id)}>
              Delete
            </button>
          </div>
        ))
      )}

      {/* LOGOUT */}
      <div className="logout-container">
        <button onClick={logout} className="logout-btn">
          Logout
        </button>
      </div>
    </div>
  );
}

export default Dashboard;