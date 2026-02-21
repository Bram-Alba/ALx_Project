import { useState, useEffect } from "react";
import Header from "./components/Header";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

function App() {

  // Load tasks from localStorage
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  // Filter state
  const [filter, setFilter] = useState("all");
  
  const activeCount = tasks.filter(task => !task.completed).length;

  function clearCompleted() {
  setTasks(tasks.filter(task => !task.completed));
}


  // Add task
  function addTask(taskText) {
    const newTask = {
      id: Date.now(),
      text: taskText,
      completed: false,
    };

    setTasks(prevTasks => [...prevTasks, newTask]);
  }

  // Delete task
  function deleteTask(id) {
    setTasks(prevTasks =>
      prevTasks.filter(task => task.id !== id)
    );
  }

  // Toggle complete / undo
  function toggleTask(id) {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  }

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Filter logic
  const filteredTasks = tasks.filter(task => {
    if (filter === "completed") return task.completed;
    if (filter === "active") return !task.completed;
    return true;
  });

  return (
    <div className="max-w-md mx-auto mt-10 p-4">

      <Header />

      <TaskForm addTask={addTask} />

      {/* Filter buttons */}
      <div className="flex justify-center gap-2 my-4">

        <button
          onClick={() => setFilter("all")}
          className={`px-3 py-1 rounded ${
            filter === "all"
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          }`}
        >
          All
        </button>

        <button
          onClick={() => setFilter("active")}
          className={`px-3 py-1 rounded ${
            filter === "active"
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          }`}
        >
          Active
        </button>

        <button
          onClick={() => setFilter("completed")}
          className={`px-3 py-1 rounded ${
            filter === "completed"
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          }`}
        >
          Completed
        </button>

      </div>

      <TaskList
        tasks={filteredTasks}
        deleteTask={deleteTask}
        toggleTask={toggleTask}
      />

    {/* Clear completed button */}
    <button onClick={clearCompleted}>
      Clear Completed
    </button>

    {/* Task counter */}
    <p>{activeCount} tasks remaining</p>


    </div>
  );
}

export default App;
