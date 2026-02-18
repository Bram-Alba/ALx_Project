import TaskItem from "./TaskItem";

function TaskList({ tasks, deleteTask, toggleTask }) {
  return (
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
          />
        ))
      )}
    </ul>
  );
}

export default TaskList;
