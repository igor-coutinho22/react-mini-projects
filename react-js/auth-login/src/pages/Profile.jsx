import { useNavigate } from "react-router-dom";
import { logout, getUserEmail, getLoginAt } from "../services/auth";
import AppNav from "../components/AppNav";

export default function Profile() {
    const navigate = useNavigate();
    const email = getUserEmail();
    const loginAt = getLoginAt();

    function handleLogout() {
        logout();
        navigate("/login", { replace: true });
    }

    return (
        <div className="page-container">
            <div className="card">
                <AppNav />

                <h1 className="page-title">Profile</h1>

                <dl className="profile-details">
                    <dt>Email</dt>
                    <dd>{email || "—"}</dd>

                    <dt>Logged in since</dt>
                    <dd>{loginAt ? new Date(loginAt).toLocaleString() : "—"}</dd>
                </dl>

                <button onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );
}
