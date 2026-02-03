export default function TaskCard({ task, onEdit, onDelete, onDragStart }) {
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

      {task.description && <p className="task-desc">{task.description}</p>}

      <div className="task-actions">
        <button className="btn btn-small" onClick={() => onEdit(task)} type="button">
          Editar
        </button>
        <button
          className="btn btn-small btn-danger"
          onClick={() => onDelete(task.id)}
          type="button"
        >
          Apagar
        </button>
      </div>
    </div>
  );
}
