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

  // GlobalTimerEngine
useEffect(() => {
  const interval = setInterval(() => {
    setTasks(prevTasks =>
      prevTasks.map(task => {
        if (task.running && task.time < task.duration) {
          return { ...task, time: task.time + 1 };
        }
        return task;
      })
    );
  }, 1000);

  return () => clearInterval(interval);
}, []);

  // StartTimer
function startTimer(id) {
  setTasks(prevTasks =>
    prevTasks.map(task =>
      task.id === id && task.time < task.duration
        ? { ...task, running: true }
        : task
    )
  );
}

  // PauseTimer
function pauseTimer(id) {
  setTasks(prevTasks =>
    prevTasks.map(task =>
      task.id === id ? { ...task, running: false } : task
    )
  );
}

  // ResetTimer
function resetTimer(id) {
  setTasks(prevTasks =>
    prevTasks.map(task =>
      task.id === id ? { ...task, time: 0, running: false } : task
    )
  );
}

  // Add task
  function addTask(taskText) {
    const newTask = {
  id: Date.now(),
  text: taskText,
  completed: false,
   time: 0,
   duration: 1500, // 25 minutes default 
   running: false
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
        startTimer={startTimer}
        pauseTimer={pauseTimer}
        resetTimer={resetTimer}
      />

    {/* Clear completed button */}
    <button
         onClick={clearCompleted}
         className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded"
         >
         Clear Completed
     </button>

    {/* Task counter */}
   <p className="text-center text-gray-600 mt-2">
    {activeCount} task{activeCount !== 1 ? "s" : ""} remaining
   </p>

    </div>
  );
}

export default App;
