import List from "./List";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import AddNew from "./AddNew";

const initialBoardData = {
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
  listOrder: ["list-1", "list-2", "list-3"],
};

export default function Board() {
  const [data, setData] = useState(initialBoardData);

  function addList(title) {
    const newListId = `list-${uuidv4()}`;
    const newList = {
      id: newListId,
      title: title,
      cardIds: [],
    };
    setData({
      ...data,
      lists: {
        ...data.lists,
        [newListId]: newList,
      },
      listOrder: [...data.listOrder, newListId],
    });
  }

  function addCard(listId, newCard) {
    // if (newCard.title.trim() === "") return;
    const list = data.lists[listId];
    const updatedCardIds = [...list.cardIds, newCard.id];
    setData({
      ...data,
      lists: {
        ...data.lists,
        [listId]: { ...list, cardIds: updatedCardIds },
      },
      cards: { ...data.cards, [newCard.id]: newCard },
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

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="board" type="list" direction="horizontal">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex justify-start w-auto mx-3 my-3"
          >
            {data.listOrder.map((listId, index) => {
              const list = data.lists[listId];
              const cards = list.cardIds.map((cardId) => data.cards[cardId]);

              return (
                <Draggable key={list.id} draggableId={list.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="h-min"
                    >
                      <List
                        list={list}
                        cards={cards}
                        deleteCard={deleteCard}
                        editCard={editCard}
                        addCard={addCard}
                        onDragEnd={onDragEnd}
                        dragHandleProps={provided.dragHandleProps}
                      />
                    </div>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
            <AddNew type="list" handleAddNew={addList} />
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
