export const defaultBoard = {
  columns: [
    { id: "todo", title: "To Do" },
    { id: "doing", title: "In Progress" },
    { id: "done", title: "Done" },
  ],
  tasks: [
    {
      id: "t1",
      title: "Create a board layout",
      description: "Define columns and cards.",
      priority: "Medium",
      columnId: "todo",
      createdAt: new Date().toISOString(),
    },
  ],
};
