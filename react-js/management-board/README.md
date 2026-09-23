# Management Board

A React task management app inspired by a Kanban/SCRUM board, with drag & drop between columns and a light/dark theme.

## Features
- Create, edit and delete tasks (with a confirmation prompt before deleting)
- Optional **due date** per task, with an **overdue** indicator
- Organize tasks into columns (To Do / In Progress / Done)
- Move tasks between columns (drag & drop)
- Board state persisted in `localStorage`
- **Light mode** and **dark mode**, with a custom animated toggle switch

*No backend — the goal is to demonstrate state management, user interaction and data persistence on the front end.*

## Live Demo
[management-board-igor.netlify.app](https://management-board-igor.netlify.app/)

## Tech stack
- React
- react-icons
- HTML5 Drag and Drop API
- Web Storage API (`localStorage`)

## Getting started
```bash
npm install
npm start
```

## Technical details

### Project structure

**`src/index.js`**
- App entry point
- Renders the `<App />` component
- Imports the app's global styles

**`src/App.js`**
- Main app component
- Responsible for:
  - Managing the board's global state
  - Managing the theme (light/dark)
  - Controlling the task create/edit modal
- Orchestrates the app's components (columns, tasks and modal)

**`src/data/defaultBoard.js`**
- Defines the board's initial state:
  - Available columns
  - Sample initial tasks
- Used when there's no state saved in `localStorage`

**`src/services/boardStorage.js`**
Service layer responsible for board persistence:
- `loadBoard()` → loads the board state from `localStorage`
- `saveBoard(board)` → saves the current board state to `localStorage`

Data is stored under the key `management_board_state_v1`.
