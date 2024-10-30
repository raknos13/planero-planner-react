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
    setBoardsData((prevData) => {
      const list = prevData.lists[listId];
      const remainingCards = { ...prevData.cards };
      delete remainingCards[cardId];
      return {
        ...prevData,
        cards: remainingCards,
        lists: {
          ...prevData.lists,
          [listId]: {
            ...list,
            cardIds: list.cardIds.filter((id) => id !== cardId),
          },
        },
      };
    });
  }

  function editCard(cardId, updatedCard) {
    setBoardsData((prevData) => ({
      ...prevData,
      cards: {
        ...prevData.cards,
        [cardId]: {
          ...prevData.cards[cardId],
          ...updatedCard,
        },
      },
    }));
  }

  // Function to handle what happens when dragging ends
  function onDragEnd(result) {
    const { destination, source, type } = result;
    // If there's no destination (dropped outside), do nothing
    if (!destination) return;

    // Handle list reordering
    if (type === "list") {
      const newListOrder = Array.from(data.listOrder);
      const [movedList] = newListOrder.splice(source.index, 1);
      newListOrder.splice(destination.index, 0, movedList);
      setData({
        ...data,
        listOrder: newListOrder,
      });
      return;
    }

    // Handle card reordering
    const sourceList = data.lists[source.droppableId];
    const destList = data.lists[destination.droppableId];

    // If moving to same list
    if (sourceList === destList) {
      const newCardIds = Array.from(sourceList.cardIds);
      const [movedCard] = newCardIds.splice(source.index, 1);
      newCardIds.splice(destination.index, 0, movedCard);

      setData({
        ...data,
        lists: {
          ...data.lists,
          [sourceList.id]: {
            ...sourceList,
            cardIds: newCardIds,
          },
        },
      });
    } else {
      // If moving to different list
      const sourceCardIds = Array.from(sourceList.cardIds);
      const destCardIds = Array.from(destList.cardIds);

      const [movedCard] = sourceCardIds.splice(source.index, 1);
      destCardIds.splice(destination.index, 0, movedCard);

      setData({
        ...data,
        lists: {
          ...data.lists,
          [sourceList.id]: {
            ...sourceList,
            cardIds: sourceCardIds,
          },
          [destList.id]: {
            ...destList,
            cardIds: destCardIds,
          },
        },
      });
    }
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
    addNewCard,
    editCard,
    deleteCard,
    onDragEnd,
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
