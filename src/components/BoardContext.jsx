import { initialData } from "../initialData";
import { useState, createContext, useContext } from "react";
import { v4 as uuidv4 } from "uuid";

const BoardContext = createContext();

export function BoardProvider({ children }) {
  const [boardsData, setBoardsData] = useState({
    boards: initialData.boards,
    lists: initialData.lists,
    cards: initialData.cards,
    activeBoardId: "board-1",
  });

  const value = {
    boards: boardsData.boards,
    lists: boardsData.lists,
    cards: boardsData.cards,
    activeBoardId: boardsData.activeBoardId,
  };

  return (
    <BoardContext.Provider value={value}>{children}</BoardContext.Provider>
  );
}

export function useBoardContext() {
  const context = useContext(BoardContext);
  if (!context) {
    throw new Error("useBoardContext must be used within a BoardProvider");
  }
  return context;
}
