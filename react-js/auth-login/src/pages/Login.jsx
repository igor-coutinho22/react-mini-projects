/* O componente Login utiliza estado local para controlar os inputs do formulário.
No useEffect, verifico se o utilizador já está autenticado para evitar mostrar o login desnecessariamente.
A submissão do formulário chama um serviço de autenticação que valida as credenciais e guarda a sessão.
Em caso de sucesso, o utilizador é redirecionado para o dashboard; caso contrário, é apresentada uma mensagem de erro. */

//-------------------------------------------------------------------------------------------------------------------------

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login, isAuthenticated } from "../services/auth";

// Página de login
export default function Login() {
    const navigate = useNavigate(); // hook para navegação entre páginas
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    // Redireciona para o dashboard se já estiver autenticado
    useEffect(() => {
        if (isAuthenticated()) {
            navigate("/dashboard", { replace: true });
        }
    }, [navigate]);

    // Função para lidar com o envio do formulário de login
    function handleSubmit(e) {
        e.preventDefault();
        setError("");

        const ok = login(email, password); // tenta fazer login
        if (!ok) {
            setError("Preenche email e password.");
            return;
        }

        navigate("/dashboard");
    }

    return (
        <div className="page-container">
            <div className="card">
                {/* Título da página */}
                <h1 className="page-title">Login</h1>

                {/* Texto introdutório */}
                <p>Bem-vindo! Introduz as tuas credenciais para entrares.</p>

                {/* Formulário de login */}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email</label>
                        <br />
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="ex: igor@exemplo.com"
                            required
                        />
                    </div>

                    <br />
                    <div className="form-group">
                        <label>Password</label>
                        <br />
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <br />

                    {/* Botão de submissão */}
                    <button type="submit">Entrar</button>

                    {/* Mensagem de erro, renderizada condicionalmente */}
                    {error && <p style={{ color: "red" }}>{error}</p>}
                </form>
            </div>
        </div>
    );
}
