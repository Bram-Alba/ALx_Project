function TaskItem({ task, deleteTask, toggleTask, startTimer, pauseTimer, resetTimer }) {

const remaining = task.duration - task.time;
const minutes = Math.floor(remaining / 60);
const seconds = remaining % 60;

  return (
    <li className="flex flex-col bg-white shadow-md rounded-lg p-3 mb-3">

      <div className="flex justify-between items-center">

        <span
          className={`flex-1 ${
            task.completed
              ? "line-through text-gray-400"
              : "text-gray-800"
          }`}
        >
          {task.text}
        </span>

        <button
          onClick={() => toggleTask(task.id)}
          className={`px-3 py-1 rounded mr-2 text-white ${
            task.completed
              ? "bg-yellow-500"
              : "bg-green-500"
          }`}
        >
          {task.completed ? "Undo" : "Complete"}
        </button>

        <button
          onClick={() => deleteTask(task.id)}
          className="px-3 py-1 rounded bg-red-500 text-white"
        >
          Delete
        </button>

      </div>

      {/* TIMER DISPLAY */}
      <div className="flex items-center justify-between mt-3">

        <span className="font-mono text-lg">
          {minutes}:{seconds.toString().padStart(2, "0")}
        </span>

        <div className="flex gap-2">

          {!task.running ? (
            <button
              onClick={() => startTimer(task.id)}
              className="bg-blue-500 text-white px-2 py-1 rounded"
            >
              Start
            </button>
          ) : (
            <button
              onClick={() => pauseTimer(task.id)}
              className="bg-yellow-500 text-white px-2 py-1 rounded"
            >
              Pause
            </button>
          )}

          <button
            onClick={() => resetTimer(task.id)}
            className="bg-gray-500 text-white px-2 py-1 rounded"
          >
            Reset
          </button>

        </div>

      </div>

    </li>
  );
}

export default TaskItem;