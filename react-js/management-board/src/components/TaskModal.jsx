/* O TaskModal é um componente reutilizável para criação e edição de tarefas.
Usa estado local para controlar os campos do formulário e um useEffect para sincronizar os dados quando o modal abre.
A submissão valida os dados e delega a persistência ao componente pai através de callbacks.*/

// ----------------------------------------------------------------------------------------------------------------------

import { useEffect, useState } from "react";

// Componente modal para criar ou editar uma tarefa
export default function TaskModal({ isOpen, initialTask, onClose, onSave }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Média");
  const [error, setError] = useState("");

  // Atualiza os campos do formulário quando o modal é aberto ou a tarefa inicial muda
  useEffect(() => {
    if (!isOpen) return;

    setTitle(initialTask?.title || "");
    setDescription(initialTask?.description || "");
    setPriority(initialTask?.priority || "Média");
    setError("");
  }, [isOpen, initialTask]);

  if (!isOpen) return null;

  // Manipulador de submissão do formulário
  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    // Verifica se o título está preenchido (obrigatório)
    if (!title.trim()) {
      setError("O título é obrigatório.");
      return;
    }

    // Envia os dados para o componente pai
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
        {/* Conteúdo do modal */}
        <div className="modal-header">
          <h2>{initialTask ? "Editar tarefa" : "Nova tarefa"}</h2>
          {/* Botão de fechar */}
          <button className="btn btn-ghost" onClick={onClose} type="button">
            ✕
          </button>
        </div>

        {/* Formulário do modal */}
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
