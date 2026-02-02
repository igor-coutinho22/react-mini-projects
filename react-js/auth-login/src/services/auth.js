// Este ficheiro centraliza a lógica de "autenticação" (fake) usando localStorage
export function isAuthenticated() {
    // Considera autenticado se existir auth === "true" no localStorage
    return localStorage.getItem("auth") === "true";
}

export function login(email, password) {
    // Login fake: basta ter email e password preenchidos
    if (!email || !password) return false;

    // Guarda um "flag" de sessão e o email para mostrar no dashboard
    localStorage.setItem("auth", "true");
    localStorage.setItem("userEmail", email);
    return true;
}

export function logout() {
    // Remove dados da sessão
    localStorage.removeItem("auth");
    localStorage.removeItem("userEmail");
}

export function getUserEmail() {
    // Lê o email guardado (pode ser null se não existir)
    return localStorage.getItem("userEmail");
}
