function TaskItem({ task, deleteTask, toggleTask }) {
  return (
    <li className="flex justify-between items-center bg-white shadow-md rounded-lg p-3 mb-3">

      {/* Task text */}
      <span
        className={`flex-1 ${
          task.completed
            ? "line-through text-gray-400"
            : "text-gray-800"
        }`}
      >
        {task.text}
      </span>

      {/* Complete / Undo button */}
      <button
        onClick={() => toggleTask(task.id)}
        className={`px-3 py-1 rounded mr-2 text-white ${
          task.completed
            ? "bg-yellow-500 hover:bg-yellow-600"
            : "bg-green-500 hover:bg-green-600"
        }`}
      >
        {task.completed ? "Undo" : "Complete"}
      </button>

      {/* Delete button */}
      <button
        onClick={() => deleteTask(task.id)}
        className="px-3 py-1 rounded bg-red-500 hover:bg-red-600 text-white"
      >
        Delete
      </button>

    </li>
  );
}

export default TaskItem;
