import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login, isAuthenticated } from "../services/auth";

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    // skip the login form if a session already exists
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
            setError("Please fill in email and password.");
            return;
        }

        navigate("/dashboard");
    }

    return (
        <div className="page-container">
            <div className="card">
                <h1 className="page-title">Login</h1>

                <p>Welcome! Please enter your credentials to log in.</p>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="ex: igor@exemplo.com"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit">Enter</button>

                    {error && <p className="form-error">{error}</p>}
                </form>
            </div>
        </div>
    );
}
