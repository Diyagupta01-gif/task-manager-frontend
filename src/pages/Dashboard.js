import React, { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [tasks, setTasks] = useState([]);

  const token = localStorage.getItem("token");

  const fetchTasks = async () => {
    try {
      const res = await axios.get("https://your-backend.onrender.com/api/tasks", {
        headers: {
          Authorization: token,
        },
      });
      setTasks(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ IMPORTANT FIX (ignore warning)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>

      {tasks.map((task) => (
        <div key={task._id}>
          <p>{task.title}</p>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;