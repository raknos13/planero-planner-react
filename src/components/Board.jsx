import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import List from "./List";
import AddNew from "./AddNew";
import { initialData } from "../initialData";

export default function Board() {
  const [data, setData] = useState(initialData);

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
            // className="flex h-100 justify-start overflow-x-auto whitespace-nowrap scroll-smooth snap-x snap-mandatory  mx-4 my-4"
            className="boardContainer flex flex-grow w-full h-full p-4 overflow-x-scroll"
          >
            <div>
              <div className="listContainer flex gap-3 h-min">
                {data.listOrder.map((listId, index) => {
                  const list = data.lists[listId];
                  const cards = list.cardIds.map(
                    (cardId) => data.cards[cardId],
                  );
                  return (
                    <Draggable
                      key={list.id}
                      draggableId={list.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <List
                            list={list}
                            cards={cards}
                            deleteCard={deleteCard}
                            editCard={editCard}
                            addCard={addCard}
                            dragHandleProps={provided.dragHandleProps}
                          />
                        </div>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
                <div className="min-w-[250px] bg-gray-200 h-min rounded-xl p-2 mx-2 mr-4">
                  <AddNew
                    type="list"
                    multiAddMode={false}
                    handleAddNew={addList}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
