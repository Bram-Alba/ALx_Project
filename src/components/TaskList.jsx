import TaskItem from "./TaskItem";

function TaskList({ tasks, deleteTask, toggleTask, startTimer, pauseTimer, resetTimer }) {  return (
    <ul className="mt-4">
      {tasks.length === 0 ? (
        <p className="text-gray-500 text-center">
          No tasks yet. Add one above 👆
        </p>
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
