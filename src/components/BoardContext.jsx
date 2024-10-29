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

  // Board management functions
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
          listOrder: [],
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
    // Return if there's one or less boards
    if (Object.keys(boardsData.boards).length <= 1) return;

    const { [boardId]: deletedBoard, ...remainingBoards } = boardsData.boards;
    const remainingLists = { ...boardsData.lists };
    const remainingCards = { ...boardsData.cards };

    // Accumulate all the cardIds from all lists that belong to the deletedBoard
    const cardIdsToDelete = deletedBoard.listIds.reduce((cardIds, listId) => {
      const list = remainingLists[listId];
      if (list) {
        cardIds.push(...list.cardIds);
        delete remainingLists[listId];
      }
      return cardIds;
    }, []);

    // Delete the cards that correspond to those Ids
    cardIdsToDelete.forEach((cardId) => {
      delete remainingCards[cardId];
    });

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

  // List management functions
  function addList(title) {
    const newListId = `list-${uuidv4()}`;
    const activeBoard = boardsData.boards[boardsData.activeBoardId];

    setBoardsData((prevData) => ({
      ...prevData,
      lists: {
        ...prevData.lists,
        [newListId]: {
          id: newListId,
          title: title,
          cardIds: [],
        },
      },
      boards: {
        ...prevData.boards,
        [activeBoard.id]: {
          ...activeBoard,
          listIds: [...activeBoard.lists, newListId],
          listOrder: [...activeBoard.listOrder, newListId],
        },
      },
    }));
  }

  function deleteList(listId) {
    const activeBoard = boardsData.boards[boardsData.activeBoardId];
    // fetch the list associated w the listId
    const list = boardsData.lists[listId];
    // get all the cards
    const remainingCards = { ...boardsData.cards };

    // delete the cards that belong to the list
    list.cards.forEach((cardId) => delete remainingCards[cardId]);

    // create new lists object and delete the list
    const remainingLists = { ...boardsData.lists };
    delete remainingLists[listId];

    setBoardsData((prevData) => ({
      ...prevData,
      lists: remainingLists,
      cards: remainingCards,
      boards: {
        ...prevData.boards,
        [activeBoard.Id]: {
          ...activeBoard,
          listIds: activeBoard.listIds.filter((id) => id !== listId),
          listOrder: activeBoard.listOrder.filter((id) => id !== listId),
        },
      },
    }));
  }

  // Card management functions
  function addNewCard(listId, cardTitle) {
    const newCardId = `card-${uuidv4()}`;
    const newCard = {
      id: newCardId,
      title: cardTitle,
      description: "",
      labels: "",
      completed: false,
    };

    setBoardsData((prevData) => {
      const list = prevData.lists[listId];
      return {
        ...prevData,
        cards: { ...prevData.cards, [newCardId]: newCard },
        lists: {
          ...prevData.lists,
          [listId]: {
            ...list,
            cardIds: [...list.cardIds, newCardId],
          },
        },
      };
    });
  }

  function deleteCard(listId, cardId) {
    const list = data.lists[listId];
    const newCardIds = list.cardIds.filter((id) => id !== cardId);
    const { [cardId]: deletedCard, ...remainingCards } = data.cards;
    setData({
      ...data,
      lists: {
        ...data.lists,
        [listId]: { ...list, cardIds: newCardIds },
      },
      cards: remainingCards,
    });
  }

  function editCard(cardId, updatedCard) {
    const updatedCards = { ...data.cards, [cardId]: updatedCard };
    setData({
      ...data,
      cards: updatedCards,
    });
  }

  const value = {
    boards: boardsData.boards,
    lists: boardsData.lists,
    cards: boardsData.cards,
    activeBoardId: boardsData.activeBoardId,
    addNewBoard,
    switchBoard,
    deleteBoard,
    addList,
    deleteList,
    addCard: addNewCard,
    editCard,
    deleteCard,
    handleDragEng,
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
