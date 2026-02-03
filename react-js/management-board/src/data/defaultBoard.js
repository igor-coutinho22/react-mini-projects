// Estado inicial da management board
export const defaultBoard = {
  // Definição das colunas da board
  columns: [
    { id: "todo", title: "To Do" },
    { id: "doing", title: "In Progress" },
    { id: "done", title: "Done" },
  ],
  // Definição das tarefas iniciais
  tasks: [
    {
      id: "t1",
      title: "Criar layout da board",
      description: "Definir colunas e cards.",
      priority: "Média",
      columnId: "todo",
      createdAt: new Date().toISOString(),
    },
  ],
};
