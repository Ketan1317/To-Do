import React, { useState, useEffect } from 'react';

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
    if (newTask.length === 0) {
      return;
    }
    const updatedTasks = [...tasks, newTask];
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
    <div className="pt-5 select-none text-center">
      <h1 className="text-6xl font-extrabold text-zinc-200">To-Do List</h1>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          addTask();
        }}
      >
        <label className="font-semibold text-2xl">
          Enter New Task:
          <input
            type="text"
            onChange={(event) => setNewTask(event.target.value)}
            className="border-[1px] hover:border-2 mt-6 pl-4 ml-7 border-zinc-300"
            placeholder="Enter............."
            value={newTask}
          />
          
          <br />
          <input
            type="submit"
            value="Add Task"
            className="bg-green-400 hover:bg-green-700 cursor-pointer mt-4 text-md rounded-2xl font-semibold px-4 py-2"
          />
        </label>
      </form>
      <p className="text-2xl font-bold text-cyan-700 text-center mt-4 mb-3">
        Number of Tasks to-do: {count}
      </p>
      <div className="p-6 border-2 pb-7 h-fit border-gray-500 ml-10 mr-10 mt-7">
        <h1 className="font-bold text-cyan-500 text-3xl">Tasks To Do 👇</h1>

        {tasks.length > 0 ? (
          <ul>
            {tasks.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center justify-center gap-7">
                  <h2 className="text-3xl text-zinc-300 font-bold mt-2">{index + 1}.</h2>
                  <li className="ml-4 text-3xl mt-5 font-bold">{item}</li>
                </div>
                <button
                  onClick={() => deleteTask(index)}
                  className="bg-red-500 mr-4 px-4 py-2 cursor-pointer hover:bg-red-800 font-semibold text-xs rounded-md"
                >
                  Delete
                </button>
              </div>
            ))}
          </ul>
        ) : (
          <h1 className="text-5xl font-extrabold mt-11">
            No Tasks To Do.......Enjoy 🍻
          </h1>
        )}
      </div>
    </div>
  );
}

export default App;
