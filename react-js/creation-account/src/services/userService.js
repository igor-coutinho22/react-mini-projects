/* Centralizei a lógica de criação de utilizadores num serviço.
Os utilizadores são guardados no localStorage, e antes de criar um novo verifico se o email já existe.
A função devolve um objeto de sucesso ou erro, permitindo ao componente reagir corretamente. */

//-------------------------------------------------------------------------------------------------------

const STORAGE_KEY = "create_account_users";

// Função para obter a lista de utilizadores do localStorage
export function getUsers() {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : []; // retorna um array vazio se não houver utilizadores
}

// Função para verificar se um utilizador com o email fornecido já existe
export function userExists(email) {
  const users = getUsers();
  return users.some((u) => u.email.toLowerCase() === email.toLowerCase());
}

// Função para criar um novo utilizador
export function createUser({ email, password, name }) {
  const users = getUsers();

  // impede a criação de utilizadores com emails duplicados
  if (userExists(email)) {
    return {
      success: false,
      message: "Este email já está registado."
    };
  }

  // cria o novo utilizador
  const newUser = {
    id: crypto?.randomUUID?.() || String(Date.now()),
    name,
    email,
    password,
    createdAt: new Date().toISOString(),
  };

  // adiciona o novo utilizador à lista e atualiza o localStorage
  users.push(newUser);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  return { success: true };
}
