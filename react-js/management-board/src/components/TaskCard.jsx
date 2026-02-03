/* O TaskCard representa uma tarefa individual.
Recebe os dados da tarefa por props e delega ações como editar, apagar e drag para callbacks do componente pai.
Uso drag & drop nativo do HTML e renderização condicional para a descrição.*/

// ---------------------------------------------------------------------------------------------------------------

// O componente TaskCard representa um cartão de tarefa individual.
export default function TaskCard({ task, onEdit, onDelete, onDragStart }) {
  return (
    <div
      className="task-card"
      draggable
      onDragStart={(e) => onDragStart(e, task.id)}
    >
      {/* Cabeçalho do cartão */}
      <div className="task-top">
        <strong className="task-title">{task.title}</strong>

        {/* Etiqueta de prioridade */}
        <span className={`pill pill-${task.priority.toLowerCase()}`}>
          {task.priority}
        </span>
      </div>

      {/* Descrição da tarefa */}
      {task.description &&
        <p
          className="task-desc">
          {task.description}
        </p>
      }

      {/* Ações da tarefa */}
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
