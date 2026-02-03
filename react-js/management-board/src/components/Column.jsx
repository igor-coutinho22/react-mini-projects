/* O componente Column representa uma coluna da board.
Recebe as tarefas por props e delega a renderização de cada tarefa ao componente TaskCard.
Implementa drag & drop usando eventos nativos do HTML5 e comunica com o componente pai através de callbacks.*/

// ---------------------------------------------------------------------------------------------------------------

import TaskCard from "./TaskCard";

// Componente que representa uma coluna na management board
export default function Column({
  column,
  tasks,
  onDropTask,
  onDragStart,
  onEditTask,
  onDeleteTask,
}) {

  //Permitir o drop de tarefas na coluna
  function handleDragOver(e) {
    e.preventDefault();
  }

  // Lidar com o drop de uma tarefa na coluna
  function handleDrop(e) {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("text/taskId");
    if (taskId) onDropTask(taskId, column.id);
  }

  return (
    <div
      className="column"
      onDragOver={handleDragOver}
      onDrop={handleDrop}>
      {/* Cabeçalho da coluna */}
      <div className="column-header">
        {/* Título da coluna */}
        <h3>{column.title}</h3>
        <span className="count">{tasks.length}</span>
      </div>

      {/* Corpo da coluna */}
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
