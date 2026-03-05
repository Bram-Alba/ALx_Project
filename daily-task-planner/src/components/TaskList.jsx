import TaskItem from "./TaskItem";

function TaskList({ tasks, deleteTask, toggleTask, startTimer, pauseTimer, resetTimer }) {
  return (
    <ul className="task-list">
      {tasks.length === 0 ? (
        <p className="task-list__empty">No tasks yet. Add one above ☝️</p>
      ) : (
        tasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            deleteTask={deleteTask}
            toggleTask={toggleTask}
            startTimer={startTimer}
            pauseTimer={pauseTimer}
            resetTimer={resetTimer}
          />
        ))
      )}
    </ul>
  );
}

export default TaskList;