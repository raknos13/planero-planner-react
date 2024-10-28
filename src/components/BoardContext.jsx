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

  const addNewBoard = (title) => {
    const newBoardId = `board-${uuidv4()}`;

    setBoardsData((prevData) => ({
      ...prevData,
      boards: {
        ...prevData.boards,
        [newBoardId]: {
          id: newBoardId,
          title: title,
          listIds: [],
        },
      },
      activeBoardId: newBoardId,
    }));
  };

  const switchBoard = (boardId) => {
    setBoardsData((prevData) => ({
      ...prevData,
      activeBoardId: boardId,
    }));
  };

  const deleteBoard = (boardId) => {
    if (Object.keys(boardsData.boards).length <= 1) return;

    const { [boardId]: deletedBoard, ...remainingBoards } = boardsData.boards;
    const remainingLists = { ...boardsData.lists };
    const remainingCards = { ...boardsData.cards };

    deletedBoard.listIds.forEach((listId) => {
      const list = remainingLists[listId];
      if (list) {
        list.cardIds.forEach((cardId) => {
          delete remainingCards[cardId];
        });
        delete remainingLists[listId];
      }
    });

    const newActiveBoardId =
      boardId === boardsData.activeBoardId
        ? Object.keys(remainingBoards)[0]
        : boardsData.activeBoardId;

    setBoardsData((prevData) => ({
      ...prevData,
      boards: remainingBoards,
      lists: remainingLists,
      cards: remainingCards,
      activeBoardId: newActiveBoardId,
    }));
  };

  const value = {
    boards: boardsData.boards,
    lists: boardsData.lists,
    cards: boardsData.cards,
    activeBoardId: boardsData.activeBoardId,
    addNewBoard,
    switchBoard,
    deleteBoard,
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
