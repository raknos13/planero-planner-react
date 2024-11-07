export const initialData = {
  activeBoardId: "board-1",
  boards: {
    "board-1": {
      id: "board-1",
      title: "Sample board",
      color: "rgb(255, 87, 51)",
      listIds: ["list-1", "list-2", "list-3"],
    },
  },
  lists: {
    "list-1": {
      id: "list-1",
      title: "To Do",
      cardIds: ["card-1", "card-5", "card-2", "card-6"],
    },
    "list-2": {
      id: "list-2",
      title: "In Progress",
      cardIds: ["card-3", "card-4"],
    },
    "list-3": {
      id: "list-3",
      title: "Paused",
      cardIds: [],
    },
  },
  cards: {
    "card-1": {
      id: "card-1",
      title: "Implement drag and drop for list and cards",
      description: "",
      labels: ["project"],
      completed: true,
    },
    "card-2": {
      id: "card-2",
      title:
        "Implement context API for centralized state management and to avoid prop drilling",
      description: "",
      labels: ["learning"],
      completed: true,
    },
    "card-3": {
      id: "card-3",
      title: "You can't learn unless you build",
      description: "Implementing stuff is important",
      labels: ["learning"],
      completed: false,
    },
    "card-4": {
      id: "card-4",
      title: "Write documentation",
      description: "Document the process",
      labels: ["documentation"],
      completed: false,
    },
    "card-5": {
      id: "card-5",
      title: "Normalize the data structure to improve performance",
      description: "Normalize to improve performance",
      labels: ["todo"],
      completed: true,
    },
    "card-6": {
      id: "card-6",
      title: "Implement Local Storage for app data",
      description: "",
      labels: ["todo"],
      completed: false,
    },
  },
};
