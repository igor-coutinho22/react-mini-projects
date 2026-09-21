import { useNavigate } from "react-router-dom";
import { logout, getUserEmail } from "../services/auth";
import MemoryGame from "../components/MemoryGame";

export default function Dashboard() {
    const navigate = useNavigate();
    const email = getUserEmail();

    function handleLogout() {
        logout();
        // replace: true drops the dashboard from history so the back button can't return to it
        navigate("/login", { replace: true });
    }

    return (
        <div className="page-container page-container--wide">
            <div className="card">
                <h1 className="page-title">Dashboard</h1>

                <p>
                    Welcome{email ? `, ${email}` : ""}! <br />
                    Since you're here, try the mini memory game.
                </p>

                <button onClick={handleLogout}>Logout</button>
            </div>

            <div className="card">
                <MemoryGame />
            </div>
        </div>
    );
}
