import { useEffect, useMemo, useState } from "react";
import Column from "./components/Column";
import TaskModal from "./components/TaskModal";
import { loadBoard, saveBoard } from "./services/boardStorage";
import { defaultBoard } from "./data/defaultBoard";
import "./index.css";

function makeId() {
  return (crypto?.randomUUID?.() || `t_${Date.now()}_${Math.random()}`)
    .toString()
    .replaceAll(".", "");
}

export default function App() {
  const [board, setBoard] = useState(() => loadBoard() || defaultBoard);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  // ✅ Tema (light/dark) com persistência
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  function toggleTheme() {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  }

  // persistência automática da board
  useEffect(() => {
    saveBoard(board);
  }, [board]);

  const tasksByColumn = useMemo(() => {
    const map = {};
    for (const col of board.columns) map[col.id] = [];
    for (const t of board.tasks) map[t.columnId]?.push(t);
    return map;
  }, [board]);

  function openCreate() {
    setEditingTask(null);
    setIsModalOpen(true);
  }

  function openEdit(task) {
    setEditingTask(task);
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setEditingTask(null);
  }

  function handleSave(taskData) {
    setBoard((prev) => {
      // editar
      if (taskData?.id) {
        return {
          ...prev,
          tasks: prev.tasks.map((t) =>
            t.id === taskData.id ? { ...t, ...taskData } : t
          ),
        };
      }

      // criar
      const newTask = {
        id: makeId(),
        title: taskData.title,
        description: taskData.description || "",
        priority: taskData.priority || "Média",
        columnId: "todo",
        createdAt: new Date().toISOString(),
      };

      return { ...prev, tasks: [newTask, ...prev.tasks] };
    });

    closeModal();
  }

  function handleDelete(taskId) {
    setBoard((prev) => ({
      ...prev,
      tasks: prev.tasks.filter((t) => t.id !== taskId),
    }));
  }

  function onDragStart(e, taskId) {
    e.dataTransfer.setData("text/taskId", taskId);
  }

  function onDropTask(taskId, targetColumnId) {
    setBoard((prev) => ({
      ...prev,
      tasks: prev.tasks.map((t) =>
        t.id === taskId ? { ...t, columnId: targetColumnId } : t
      ),
    }));
  }

  function resetBoard() {
    setBoard(defaultBoard);
  }

  return (
    <div className="app">
      <header className="header">
        <div>
          <h1 className="title">Management Board</h1>
          <p className="subtitle">Mini projeto SCRUM com React.</p>
        </div>

        <div className="header-actions">
          {/* ✅ Botão Dark/Light */}
          <button className="btn btn-ghost" onClick={toggleTheme} type="button">
            {theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>

          <button className="btn btn-primary" onClick={openCreate} type="button">
            + Nova tarefa
          </button>

          <button className="btn btn-ghost" onClick={resetBoard} type="button">
            Reset
          </button>
        </div>
      </header>

      <main className="board">
        {board.columns.map((col) => (
          <Column
            key={col.id}
            column={col}
            tasks={tasksByColumn[col.id] || []}
            onDropTask={onDropTask}
            onDragStart={onDragStart}
            onEditTask={openEdit}
            onDeleteTask={handleDelete}
          />
        ))}
      </main>

      <TaskModal
        isOpen={isModalOpen}
        initialTask={editingTask}
        onClose={closeModal}
        onSave={handleSave}
      />
    </div>
  );
}
