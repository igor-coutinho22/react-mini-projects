// Componente para alternar entre temas claro e escuro
export default function ThemeToggle({ theme, onToggle }) {
  return (
    <button
      className="btn btn-ghost"
      onClick={onToggle}
      type="button"
    >
      {theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode"}
    </button>
  );
}
