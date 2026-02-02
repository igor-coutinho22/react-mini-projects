import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login, isAuthenticated } from "../services/auth";

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if (isAuthenticated()) {
            navigate("/dashboard", { replace: true });
        }
    }, [navigate]);

    function handleSubmit(e) {
        e.preventDefault();
        setError("");

        const ok = login(email, password);
        if (!ok) {
            setError("Preenche email e password.");
            return;
        }

        navigate("/dashboard");
    }

    return (
        <div className="page-container">
            <div className="card">
                <h1 className="page-title">Login</h1>


                <p>Bem-vindo! Introduz as tuas credenciais para entrares.</p>

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
                    <button type="submit">Entrar</button>

                    {error && <p style={{ color: "red" }}>{error}</p>}
                </form>
            </div>
        </div>
    );
}
