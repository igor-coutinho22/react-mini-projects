import TaskCard from "./TaskCard";

export default function Column({
  column,
  tasks,
  onDropTask,
  onDragStart,
  onEditTask,
  onDeleteTask,
}) {
  function handleDragOver(e) {
    e.preventDefault();
  }

  function handleDrop(e) {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("text/taskId");
    if (taskId) onDropTask(taskId, column.id);
  }

  return (
    <div className="column" onDragOver={handleDragOver} onDrop={handleDrop}>
      <div className="column-header">
        <h3>{column.title}</h3>
        <span className="count">{tasks.length}</span>
      </div>

      <div className="column-body">
        {tasks.map((t) => (
          <TaskCard
            key={t.id}
            task={t}
            onEdit={onEditTask}
            onDelete={onDeleteTask}
            onDragStart={onDragStart}
          />
        ))}
      </div>
    </div>
  );
}
