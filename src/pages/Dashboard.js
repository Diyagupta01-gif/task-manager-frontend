import React, { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  // GET TASKS
  const fetchTasks = async () => {
    try {
      setLoading(true);

      const res = await axios.get("http://localhost:8000/api/tasks", {
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

  // ADD TASK
  const addTask = async () => {
    if (!title.trim()) {
      alert("Task cannot be empty ❌");
      return;
    }

    try {
      await axios.post(
        "http://localhost:8000/api/tasks",
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

  // DELETE TASK
  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchTasks();
    } catch (err) {
      console.log(err);
    }
  };

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

      {/* Add Task */}
      <div className="add-task">
        <input
          type="text"
          placeholder="Enter task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button onClick={addTask}>Add</button>
      </div>

      {/* Task List */}
      <div className="task-list">
        {loading ? (
          <p>Loading...</p>
        ) : tasks.length === 0 ? (
          <p>No tasks yet</p>
        ) : (
          tasks.map((task) => (
            <div className="task-card" key={task._id}>
              <span>{task.title}</span>

              {/* DELETE BUTTON */}
              <button onClick={() => deleteTask(task._id)}>
                ❌ Delete
              </button>
            </div>
          ))
        )}
      </div>

      {/* Logout Button */}
      <button className="logout" onClick={logout}>
        Logout
      </button>
    </div>
  );
}

export default Dashboard;