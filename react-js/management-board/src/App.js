import { useEffect, useMemo, useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import Column from "./components/Column";
import TaskModal from "./components/TaskModal";
import { loadBoard, saveBoard } from "./services/boardStorage";
import { defaultBoard } from "./data/defaultBoard";
import "./index.css";

function makeId() {
  // strip dots from the Math.random() fallback so ids stay plain strings
  return (crypto?.randomUUID?.() || `t_${Date.now()}_${Math.random()}`)
    .toString()
    .replaceAll(".", "");
}

export default function App() {
  const [board, setBoard] = useState(() => loadBoard() || defaultBoard);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

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
      if (taskData?.id) {
        return {
          ...prev,
          tasks: prev.tasks.map((t) =>
            t.id === taskData.id ? { ...t, ...taskData } : t
          ),
        };
      }

      const newTask = {
        id: makeId(),
        title: taskData.title,
        description: taskData.description || "",
        priority: taskData.priority || "Medium",
        dueDate: taskData.dueDate || null,
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
    if (window.confirm("Reset the board? This will delete all tasks and restore the default board.")) {
      setBoard(defaultBoard);
    }
  }

  return (
    <div className="app">
      <header className="header">
        <div>
          <h1 className="title">Management Board</h1>
          <p className="subtitle">SCRUM mini project with React.</p>
        </div>

        <div className="header-actions">
          <button className="btn btn-primary" onClick={openCreate} type="button">
            + New Task
          </button>

          <button className="btn btn-ghost" onClick={resetBoard} type="button">
            Reset
          </button>

          <button
            className="theme-toggle"
            onClick={toggleTheme}
            type="button"
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            <FaSun className="theme-toggle-icon sun" />
            <FaMoon className="theme-toggle-icon moon" />
            <span className="theme-toggle-thumb" />
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
