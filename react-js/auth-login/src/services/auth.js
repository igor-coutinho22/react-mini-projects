export function isAuthenticated() {
    return localStorage.getItem("auth") === "true";
}

export function login(email, password) {
    // fake auth: no real credential check, just presence of both fields
    if (!email || !password) return false;

    localStorage.setItem("auth", "true");
    localStorage.setItem("userEmail", email);
    return true;
}

export function logout() {
    localStorage.removeItem("auth");
    localStorage.removeItem("userEmail");
}

export function getUserEmail() {
    return localStorage.getItem("userEmail");
}
