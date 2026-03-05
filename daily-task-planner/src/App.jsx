import { useState, useEffect } from "react";
import Header from "./components/Header";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import Settings from "./components/Settings";

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [filter, setFilter] = useState("all");
  const [showSettings, setShowSettings] = useState(false);
  const [defaultDuration, setDefaultDuration] = useState(() => {
    return parseInt(localStorage.getItem("defaultDuration")) || 1500;
  });

  const activeCount = tasks.filter(task => !task.completed).length;

  function clearCompleted() {
    setTasks(tasks.filter(task => !task.completed));
  }

  function saveSettings(newDuration) {
    setDefaultDuration(newDuration);
    localStorage.setItem("defaultDuration", newDuration);
    setShowSettings(false);
  }

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

  function startTimer(id) {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id && task.time < task.duration
          ? { ...task, running: true }
          : task
      )
    );
  }

  function pauseTimer(id) {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, running: false } : task
      )
    );
  }

  function resetTimer(id) {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, time: 0, running: false } : task
      )
    );
  }

  function addTask(taskText) {
    const newTask = {
      id: Date.now(),
      text: taskText,
      completed: false,
      time: 0,
      duration: defaultDuration,
      running: false
    };
    setTasks(prevTasks => [...prevTasks, newTask]);
  }

  function deleteTask(id) {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  }

  function toggleTask(id) {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const filteredTasks = tasks.filter(task => {
    if (filter === "completed") return task.completed;
    if (filter === "active") return !task.completed;
    return true;
  });

  const dueSoonTask = tasks.find(
    task => !task.completed && (task.duration - task.time) <= 60 && (task.duration - task.time) > 0
  );

  return (
    <div className="app-bg">
      <div className="card">

        <Header onSettingsClick={() => setShowSettings(true)} />

        {showSettings && (
          <Settings
            defaultDuration={defaultDuration}
            onSave={saveSettings}
            onClose={() => setShowSettings(false)}
          />
        )}

        <TaskForm addTask={addTask} />

        {/* Filter buttons */}
        <div className="filter-row">
          {["all", "active", "completed"].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`filter-btn ${filter === f ? "filter-btn--active" : ""}`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* Task List */}
        <div className="tasklist-wrapper">
          <p className="tasklist-label">Task List</p>
          <TaskList
            tasks={filteredTasks}
            deleteTask={deleteTask}
            toggleTask={toggleTask}
            startTimer={startTimer}
            pauseTimer={pauseTimer}
            resetTimer={resetTimer}
          />
        </div>

        {/* Clear completed */}
        <button onClick={clearCompleted} className="clear-btn">
          Clear Completed
        </button>

        {/* Due soon warning */}
        {dueSoonTask && (
          <div className="due-warning">
            ⚠️ <strong>{dueSoonTask.text}</strong> is due soon!
          </div>
        )}

        {/* Task counter */}
        <div className="task-counter">
          <span className="counter-icon">📋</span>
          <span>{activeCount} tasks remaining</span>
        </div>

      </div>
    </div>
  );
}

export default App;