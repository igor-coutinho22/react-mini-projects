import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, isAuthenticated } from "../services/auth";

// Componente de login
export default function Login() {
    const navigate = useNavigate();
    
    // Estados dos inputs e mensagem de erro
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    // Se já estiver logado, redirecionar dentro de um useEffect (evita side-effects no render)
    useEffect(() => {
        if (isAuthenticated()) {
            navigate("/dashboard", { replace: true });
        }
    }, [navigate]);

    function handleSubmit(e) {
        e.preventDefault();
        setError("");

        // Tenta fazer login (fake)
        const ok = login(email, password);

        if (!ok) {
            setError("Preenche email e password.");
            return;
        }

        // Redireciona para o dashboard após login bem-sucedido
        navigate("/dashboard");
    }

    return (
        <div style={{ maxWidth: 360, margin: "60px auto", fontFamily: "Arial" }}>
            <h2>Login</h2>

            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: 12 }}>
                    <label>Email</label>
                    <input
                        style={{ width: "100%", padding: 8 }}
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="ex: igor@exemplo.com"
                        required
                    />
                </div>

                <div style={{ marginBottom: 12 }}>
                    <label>Password</label>
                    <input
                        style={{ width: "100%", padding: 8 }}
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                    />
                </div>

                {error && <p style={{ color: "crimson" }}>{error}</p>}

                <button style={{ padding: 10, width: "100%" }} type="submit">
                    Entrar
                </button>
            </form>
        </div>
    );
}
