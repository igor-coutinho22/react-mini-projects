const STORAGE_KEY = "management_board_state_v1";

export function loadBoard() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function saveBoard(board) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(board));
}
