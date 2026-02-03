/* Utilizo o React Router para definir rotas públicas e privadas.
A rota /login é pública, enquanto o /dashboard está protegido por um componente ProtectedRoute.
Se o utilizador não estiver autenticado, é redirecionado automaticamente.
Também defino redirecionamentos para a rota raiz e para URLs inválidos.*/

//-----------------------------------------------------------------------------------------------

import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

// Define as rotas da aplicação
function App() {
  return (
    <Routes>
       {/* Rota pública para a página de login */}
      <Route path="/login" element={<Login />} />

      {/* Rota protegida para o dashboard */}

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* Redireciona a raiz para o dashboard */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      {/* Redireciona rotas desconhecidas para a página inicial */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
