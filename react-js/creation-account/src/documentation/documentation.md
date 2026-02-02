# Documentação - React (Criar Conta)

#
## Objetivo
Implementar uma aplicação React simples e independente para **criação de contas de utilizador**, com:
- Página de **Criação de Conta**
- Validação de dados introduzidos
- Verificação de **email único**
- Persistência dos utilizadores usando `localStorage`

<br>
<div style="background:#f4f6f8; padding:10px; border-left:4px solid #999;">
<strong>Nota:</strong> Este projeto <strong>não possui backend</strong>. O objetivo é demonstrar a lógica de registo de utilizadores e validações no front-end, de forma simples e académica.
</div>

#
## Tecnologias e dependências
- React (Create React App)
- JavaScript
- Web Storage API (`localStorage`)

#
## Estrutura do projeto (ficheiros principais)

### `src/index.js`
- Ponto de entrada da aplicação React
- Renderiza o componente `<App />`
- Importa os estilos globais da aplicação

### `src/App.js`
- Componente principal da aplicação
- Renderiza diretamente a página de criação de conta (`Register`)

### `src/services/userService.js`
Camada de serviço responsável pela gestão de utilizadores:
- `getUsers()` → obtém a lista de utilizadores guardados no `localStorage`
- `userExists(email)` → verifica se já existe um utilizador com o email indicado
- `createUser({ name, email, password })` → cria e guarda um novo utilizador no `localStorage`

Os utilizadores são guardados localmente sob a chave:

<div style="background:#f4f6f8; padding:10px; border-left:4px solid #999;">
create_account_users
</div>
<br>