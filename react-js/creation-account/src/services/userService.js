const STORAGE_KEY = "create_account_users";

export function getUsers() {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}

export function userExists(email) {
  const users = getUsers();
  return users.some((u) => u.email.toLowerCase() === email.toLowerCase());
}

export function createUser({ email, password, name }) {
  const users = getUsers();

  if (userExists(email)) {
    return { success: false, message: "Este email já está registado." };
  }

  const newUser = {
    id: crypto?.randomUUID?.() || String(Date.now()),
    name,
    email,
    password,
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  return { success: true };
}
