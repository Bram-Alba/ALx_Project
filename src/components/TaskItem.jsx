function TaskItem({ task, deleteTask, toggleTask }) {
  return (
    <li>
      {task.text}

      <button onClick={() => deleteTask(task.id)}>
        Delete
      </button>

      <button onClick={() => toggleTask(task.id)}>
        {task.completed ? "Undo" : "Complete"}
      </button>

    </li>
  );
}

export default TaskItem;
