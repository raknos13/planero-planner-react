export const initialData = {
  activeBoardId: "board-1",
  boards: {
    "board-1": {
      id: "board-1",
      title: "Sample board",
      color: " #FF5733",
      listIds: ["list-1", "list-2", "list-3"],
    },
  },
  lists: {
    "list-1": {
      id: "list-1",
      title: "To Do",
      cardIds: ["card-3", "card-1", "card-2", "card-4"],
    },
    "list-2": {
      id: "list-2",
      title: "In Progress",
      cardIds: ["card-5", "card-6"],
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
      title: "Implement list drag and drop",
      description: "Start from a todo list and build up",
      labels: ["project"],
      completed: true,
    },
    "card-2": {
      id: "card-2",
      title: "Learn State management in React",
      description: "Learn state management",
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
      title: "Normalize the data structure",
      description: "Normalize to improve performance",
      labels: ["todo"],
      completed: true,
    },
    "card-6": {
      id: "card-6",
      title: "Implement AddNewList component",
      description: "",
      labels: ["todo"],
      completed: false,
    },
  },
};
