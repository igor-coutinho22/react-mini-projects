import { Link, useLocation } from "react-router-dom";

export default function AppNav() {
    const { pathname } = useLocation();

    return (
        <nav className="app-nav">
            <Link to="/dashboard" className={pathname === "/dashboard" ? "active" : ""}>
                Dashboard
            </Link>
            <Link to="/profile" className={pathname === "/profile" ? "active" : ""}>
                Profile
            </Link>
        </nav>
    );
}
