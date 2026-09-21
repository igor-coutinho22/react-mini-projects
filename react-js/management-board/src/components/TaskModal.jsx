import { useEffect, useState } from "react";

export default function TaskModal({ isOpen, initialTask, onClose, onSave }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");
  const [error, setError] = useState("");

  // re-sync form fields each time the modal opens, so stale values from a previous edit don't leak in
  useEffect(() => {
    if (!isOpen) return;

    setTitle(initialTask?.title || "");
    setDescription(initialTask?.description || "");
    setPriority(initialTask?.priority || "Medium");
    setDueDate(initialTask?.dueDate || "");
    setError("");
  }, [isOpen, initialTask]);

  if (!isOpen) return null;

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!title.trim()) {
      setError("A title is required.");
      return;
    }

    onSave({
      ...initialTask,
      title: title.trim(),
      description: description.trim(),
      priority,
      dueDate: dueDate || null,
    });
  }

  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <div className="modal" onMouseDown={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{initialTask ? "Edit Task" : "New Task"}</h2>
          <button className="btn btn-ghost" onClick={onClose} type="button">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-body">
          <label className="label">Title</label>
          <input
            className="input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="ex: Implementar drag & drop"
          />

          <label className="label">Description</label>
          <textarea
            className="input textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Task details..."
          />

          <label className="label">Priority</label>
          <select
            className="input"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>

          <label className="label">Due Date</label>
          <input
            className="input"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />

          {error && <p className="error">{error}</p>}

          <div className="modal-actions">
            <button className="btn btn-ghost" onClick={onClose} type="button">
              Cancel
            </button>
            <button className="btn btn-primary" type="submit">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
