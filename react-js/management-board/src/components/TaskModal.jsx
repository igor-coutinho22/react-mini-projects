import { useEffect, useState } from "react";

export default function TaskModal({ isOpen, initialTask, onClose, onSave }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Média");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isOpen) return;

    setTitle(initialTask?.title || "");
    setDescription(initialTask?.description || "");
    setPriority(initialTask?.priority || "Média");
    setError("");
  }, [isOpen, initialTask]);

  if (!isOpen) return null;

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!title.trim()) {
      setError("O título é obrigatório.");
      return;
    }

    onSave({
      ...initialTask,
      title: title.trim(),
      description: description.trim(),
      priority,
    });
  }

  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <div className="modal" onMouseDown={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{initialTask ? "Editar tarefa" : "Nova tarefa"}</h2>
          <button className="btn btn-ghost" onClick={onClose} type="button">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-body">
          <label className="label">Título</label>
          <input
            className="input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="ex: Implementar drag & drop"
          />

          <label className="label">Descrição</label>
          <textarea
            className="input textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Detalhes da tarefa..."
          />

          <label className="label">Prioridade</label>
          <select
            className="input"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option>Baixa</option>
            <option>Média</option>
            <option>Alta</option>
          </select>

          {error && <p className="error">{error}</p>}

          <div className="modal-actions">
            <button className="btn btn-ghost" onClick={onClose} type="button">
              Cancelar
            </button>
            <button className="btn btn-primary" type="submit">
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
