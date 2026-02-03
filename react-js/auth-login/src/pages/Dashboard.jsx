/* O Dashboard é uma página protegida que só é acessível após autenticação.
Obtém o email do utilizador a partir de um serviço de autenticação e mostra uma mensagem personalizada.
Inclui um botão de logout que termina a sessão e redireciona para o login, impedindo navegação para trás.
Para tornar a página mais interativa, inclui um mini jogo da memória como componente independente. */

//---------------------------------------------------------------------------------------------------------------

import { useNavigate } from "react-router-dom";
import { logout, getUserEmail } from "../services/auth";
import MemoryGame from "../components/MemoryGame";

// Página do dashboard acessível apenas a utilizadores autenticados
export default function Dashboard() {
    const navigate = useNavigate(); // hook para navegação entre páginas
    const email = getUserEmail();

    // Função para fazer logout e redirecionar para a página de login
    function handleLogout() {
        logout();
        navigate("/login", { replace: true });
    }

    return (
        <div className="page-container">
            {/* Cartão com informação do utilizador */}
            <div className="card">
                {/* Título da página */}
                <h1 className="page-title">Dashboard</h1>

                {/* Mensagem de boas-vindas */}
                <p>
                    Bem-vindo{email ? `, ${email}` : ""}! 👋 <br />
                    Já que estás aqui, experimenta o mini jogo da memória abaixo.
                </p>

                {/* Botão de logout */}
                <button onClick={handleLogout}>Logout</button>
            </div>

            {/* Cartão com o jogo da memória */}
            <div className="card">
                <MemoryGame />
            </div>
        </div>
    );
}
