export function isAuthenticated() {
    return localStorage.getItem("auth") === "true";
}

export function login(email, password) {
    // fake auth: no real credential check, just presence of both fields
    if (!email || !password) return false;

    localStorage.setItem("auth", "true");
    localStorage.setItem("userEmail", email);
    localStorage.setItem("loginAt", new Date().toISOString());
    return true;
}

export function logout() {
    localStorage.removeItem("auth");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("loginAt");
}

export function getUserEmail() {
    return localStorage.getItem("userEmail");
}

export function getLoginAt() {
    return localStorage.getItem("loginAt");
}
