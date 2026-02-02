# Documentação - Projeto React (Login / Logout)

#
## Objetivo
Implementar uma aplicação React simples com:
- Página de **Login**
- Página protegida (**Dashboard**) acessível apenas quando autenticado
- **Logout**
- Persistência do “estado de autenticação” usando `localStorage`
- Navegação com **React Router**

> Nota: Este projeto usa autenticação **fake** (sem backend). Serve para demonstrar rotas protegidas e gestão de sessão no front-end.


#
## Tecnologias e dependências
- React (Create React App)
- JavaScript
- react-router-dom
- Web Storage API (`localStorage`)


#
## Estrutura do projeto (ficheiros principais)

### `src/index.js`
- Ponto de entrada da app React
- Renderiza o componente `<App />`
- Envolve a app com `<BrowserRouter>` para permitir rotas

### `src/App.js`
- Define as rotas da aplicação:
  - `/login` → página de login
  - `/dashboard` → página protegida
  - `/` → redireciona para `/dashboard`
  - `*` → redireciona para `/`
- Aplica proteção à rota `/dashboard` através do componente `ProtectedRoute`

### `src/services/auth.js`
Camada de serviço responsável por centralizar a lógica de autenticação:
- `isAuthenticated()` → verifica no `localStorage` se existe sessão
- `login(email, password)` → autentica de forma fake e grava no `localStorage`
- `logout()` → remove a sessão do `localStorage`
- `getUserEmail()` → obtém o email guardado para mostrar no dashboard

### `src/components/ProtectedRoute.jsx`
- “Porteiro” das rotas privadas
- Se autenticado: renderiza o conteúdo (children)
- Se não autenticado: redireciona para `/login`

### `src/pages/Login.jsx`
- Formulário controlado (useState) com email e password
- Submissão chama `login()` do serviço
- Em caso de sucesso: navega para `/dashboard`
- Em caso de erro: mostra mensagem ao utilizador

### `src/pages/Dashboard.jsx`
- Página privada
- Mostra mensagem de boas-vindas (email, se existir)
- Botão de logout: chama `logout()` e redireciona para `/login`


#
## Fluxo de execução (como a app funciona)
1. A app inicia em `index.js` e ativa o Router.
2. Ao aceder a `/dashboard`, a rota passa por `ProtectedRoute`.
3. Se não existir `auth=true` no `localStorage`, o utilizador é enviado para `/login`.
4. No `/login`, ao submeter email + password, o serviço grava `auth=true` e `userEmail=...`.
5. O utilizador é redirecionado para `/dashboard`.
6. No dashboard, ao clicar em **Logout**, a sessão é removida e o utilizador volta para `/login`.


#
## Como executar
Na pasta do projeto:

```bash
npm install
npm start
