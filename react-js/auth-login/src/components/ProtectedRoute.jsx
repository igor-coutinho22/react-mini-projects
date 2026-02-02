import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../services/auth";

// Componente de rota protegida que verifica se o utilizador está autenticado
// Se estiver, renderiza os filhos (children); caso contrário, redireciona para /login
export default function ProtectedRoute({ children }) {
    return isAuthenticated() ? children : <Navigate to="/login" replace />;
}
