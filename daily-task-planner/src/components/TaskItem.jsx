function TaskItem({ task, deleteTask, toggleTask, startTimer, pauseTimer, resetTimer }) {
  const remaining = task.duration - task.time;
  const minutes = Math.floor(remaining / 60);
  const seconds = remaining % 60;
  const progress = task.duration ? (task.time / task.duration) * 100 : 0;
  const isDueSoon = remaining <= 60 && remaining > 0;

  return (
    <li className={`task-item ${task.completed ? "task-item--done" : ""}`}>
      <div className="task-item__row">

        {/* Checkbox */}
        <button
          onClick={() => toggleTask(task.id)}
          className={`task-checkbox ${task.completed ? "task-checkbox--checked" : ""}`}
          aria-label="Toggle complete"
        >
          {task.completed && <span className="checkmark">✓</span>}
        </button>

        {/* Task text */}
        <span className={`task-text ${task.completed ? "task-text--done" : ""}`}>
          {task.text}
        </span>

        {/* Timer badge */}
        {!task.completed && (
          <span className={`timer-badge ${isDueSoon ? "timer-badge--urgent" : ""}`}>
            Time left: {minutes}:{seconds.toString().padStart(2, "0")}
          </span>
        )}

        {/* Delete button */}
        <button
          onClick={() => deleteTask(task.id)}
          className="delete-btn"
          aria-label="Delete task"
        >
          🗑
        </button>
      </div>

      {/* Progress bar */}
      {!task.completed && (
        <div className="progress-bar">
          <div
            className={`progress-bar__fill ${isDueSoon ? "progress-bar__fill--urgent" : ""}`}
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {/* Timer controls */}
      {!task.completed && (
        <div className="timer-controls">
          {!task.running ? (
            <button onClick={() => startTimer(task.id)} className="timer-btn timer-btn--start">
              ▶ Start
            </button>
          ) : (
            <button onClick={() => pauseTimer(task.id)} className="timer-btn timer-btn--pause">
              ⏸ Pause
            </button>
          )}
          <button onClick={() => resetTimer(task.id)} className="timer-btn timer-btn--reset">
            ↺ Reset
          </button>
        </div>
      )}
    </li>
  );
}

export default TaskItem;