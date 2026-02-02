import { useNavigate } from "react-router-dom";
import { logout, getUserEmail } from "../services/auth";

// Componente do dashboard (página protegida)
export default function Dashboard() {
    const navigate = useNavigate();

    // Lê o email do utilizador autenticado
    const email = getUserEmail();

    // Função de logout e redirecionamento para /login
    function handleLogout() {
        logout();
        navigate("/login", { replace: true });
    }

    return (
        <div style={{ maxWidth: 600, margin: "60px auto", fontFamily: "Arial" }}>
            <h1>Dashboard</h1>
            <p>Bem-vindo{email ? `, ${email}` : ""}! ✅</p>

            <div style={{ marginTop: 20 }}>
                <button onClick={handleLogout} style={{ padding: 10 }}>
                    Logout
                </button>
            </div>
        </div>
    );
}
