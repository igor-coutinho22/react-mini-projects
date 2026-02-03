# Documentação - React (Dashboard de gestão)

#
## Objetivo
Implementar uma aplicação React simples para gestão de tarefas, inspirada numa **board SCRUM / Kanban**, com:
- Criação, edição e remoção de tarefas
- Organização das tarefas por colunas (To Do / In Progress / Done)
- Movimento de tarefas entre colunas (drag & drop)
- Persistência do estado da board usando `localStorage`
- Interface com **Light Mode** e **Dark Mode**

<br>
<div style="background:#f4f6f8; padding:10px; border-left:4px solid #999;">
<strong>Nota:</strong> Este projeto não possui backend. O objetivo é demonstrar a lógica de gestão de estado, interação do utilizador e persistência de dados no front-end, de forma simples e académica.
</div>

#
## Tecnologias e dependências
- React (Create React App)
- JavaScript
- HTML5 Drag and Drop API
- Web Storage API (`localStorage`)

#
## Estrutura do projeto (ficheiros principais)

### `src/index.js`
- Ponto de entrada da aplicação React
- Renderiza o componente `<App />`
- Importa os estilos globais da aplicação

### `src/App.js`
- Componente principal da aplicação
- Responsável por:
  - Gerir o estado global da board
  - Gerir o tema (Light / Dark)
  - Controlar a abertura do modal de criação/edição de tarefas
- Orquestra os componentes da aplicação (colunas, tarefas e modal)

### `src/data/defaultBoard.js`
- Define o estado inicial da board:
  - Colunas disponíveis
  - Tarefas iniciais de exemplo
- Utilizado quando não existe estado guardado no `localStorage`

### `src/services/boardStorage.js`
Camada de serviço responsável pela persistência da board:
- `loadBoard()` → carrega o estado da board a partir do `localStorage`
- `saveBoard(board)` → guarda o estado atual da board no `localStorage`

Os dados são guardados sob a chave:

<br>
<div style="background:#f4f6f8; padding:10px; border-left:4px solid #999;">
management_board_state_v1
</div>
<br>