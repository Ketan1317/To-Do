import React, { useState, useEffect } from "react";

function App() {
  const [count, setCount] = useState(0);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    const data = localStorage.getItem("task");
    if (data) {
      const storedTasks = JSON.parse(data);
      setTasks(storedTasks);
      setCount(storedTasks.length);
    }
  }, []);

  const addTask = () => {
    if (newTask.trim().length === 0) return;

    const updatedTasks = [...tasks, newTask.trim()];
    setTasks(updatedTasks);
    localStorage.setItem("task", JSON.stringify(updatedTasks));
    setNewTask("");
    setCount(updatedTasks.length);
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, id) => id !== index);
    setTasks(updatedTasks);
    localStorage.setItem("task", JSON.stringify(updatedTasks));
    setCount(updatedTasks.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white flex flex-col items-center px-4 py-8">
      <h1 className="text-5xl md:text-6xl font-extrabold text-cyan-400 mb-8">
        To-Do List
      </h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          addTask();
        }}
        className="flex flex-col md:flex-row items-center gap-4 mb-8 w-full max-w-2xl"
      >
        <input
          type="text"
          placeholder="Type your task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="w-full md:flex-1 px-4 py-2 rounded-lg border border-cyan-400 bg-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
        />
        <input
          type="submit"
          value="Add Task"
          className="bg-green-500 hover:bg-green-600 cursor-pointer px-6 py-2 rounded-lg text-white font-semibold shadow-md transition"
        />
      </form>

      <p className="text-xl md:text-2xl font-semibold text-cyan-300 mb-6">
        Number of Tasks: {count}
      </p>

      <div className="bg-slate-800/70 border border-slate-600 rounded-2xl p-6 w-full max-w-3xl shadow-xl backdrop-blur">
        <h2 className="text-2xl md:text-3xl font-bold text-cyan-400 mb-4 text-center">
          Tasks To Do 👇
        </h2>

        {tasks.length > 0 ? (
          <ul className="space-y-4">
            {tasks.map((item, index) => (
              <li
                key={index}
                className="flex items-center justify-between bg-slate-700 rounded-lg px-4 py-3"
              >
                <span className="flex items-center gap-4 text-lg md:text-2xl font-semibold">
                  <span className="text-cyan-400">{index + 1}.</span> {item}
                </span>
                <button
                  onClick={() => deleteTask(index)}
                  className="bg-red-500 hover:bg-red-700 px-4 py-2 rounded-md text-white font-semibold text-sm transition"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <h3 className="text-center text-xl md:text-3xl font-bold text-gray-300 mt-8">
            No Tasks To Do... Enjoy 🍻
          </h3>
        )}
      </div>
    </div>
  );
}

export default App;
