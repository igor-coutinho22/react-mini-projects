export default function TaskCard({ task, onEdit, onDelete, onDragStart }) {
  const today = new Date().toISOString().slice(0, 10);
  const isOverdue = task.dueDate && task.dueDate < today && task.columnId !== "done";

  function handleDeleteClick() {
    if (window.confirm(`Delete "${task.title}"?`)) {
      onDelete(task.id);
    }
  }

  return (
    <div
      className="task-card"
      draggable
      onDragStart={(e) => onDragStart(e, task.id)}
    >
      <div className="task-top">
        <strong className="task-title">{task.title}</strong>

        <span className={`pill pill-${task.priority.toLowerCase()}`}>
          {task.priority}
        </span>
      </div>

      {task.description &&
        <p
          className="task-desc">
          {task.description}
        </p>
      }

      {task.dueDate && (
        <span className={`task-due${isOverdue ? " task-due-overdue" : ""}`}>
          {isOverdue ? "Overdue — " : "Due "}
          {new Date(task.dueDate).toLocaleDateString()}
        </span>
      )}

      <div className="task-actions">
        <button className="btn btn-small" onClick={() => onEdit(task)} type="button">
          Edit
        </button>
        <button
          className="btn btn-small btn-danger"
          onClick={handleDeleteClick}
          type="button"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
