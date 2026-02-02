import { useNavigate } from "react-router-dom";
import { logout, getUserEmail } from "../services/auth";
import MemoryGame from "../components/MemoryGame";

export default function Dashboard() {
    const navigate = useNavigate();
    const email = getUserEmail();

    function handleLogout() {
        logout();
        navigate("/login", { replace: true });
    }

    return (
        <div className="page-container">
            <div className="card">
                <h1 className="page-title">Dashboard</h1>

                <p>
                    Bem-vindo{email ? `, ${email}` : ""}! 👋 <br />
                    Já que estás aqui, experimenta o mini jogo da memória abaixo.
                </p>

                <button onClick={handleLogout}>Logout</button>
            </div>

            <div className="card">
                <MemoryGame />
            </div>
        </div>
    );
}
