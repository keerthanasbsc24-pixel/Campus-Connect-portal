function TaskCard({ task, onComplete }) {
  return (
    <div className="task-card">
      <h3>{task.title}</h3>

      <p>
        Status: {task.completed ? "Completed" : "Pending"}
      </p>

      {!task.completed && (
        <button onClick={() => onComplete(task.id)}>
          Complete
        </button>
      )}
    </div>
  );
}

export default TaskCard;