export const defaultBoard = {
  columns: [
    { id: "todo", title: "To Do" },
    { id: "doing", title: "In Progress" },
    { id: "done", title: "Done" },
  ],
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
