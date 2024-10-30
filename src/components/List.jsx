import { useState } from "react";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import { FiMoreHorizontal } from "react-icons/fi";
import Card from "./Card";
import { v4 as uuidv4 } from "uuid";
import AddNew from "./AddNew";
import { useBoardContext } from "./BoardContext";

export default function List({ list, listCards, dragHandleProps }) {
  const cardTemplate = {
    id: "",
    title: "",
    description: "Add a description",
    labels: "",
    completed: false,
  };
  const { deleteList, addNewCard } = useBoardContext();
  const [newCard, setNewCard] = useState(cardTemplate);

  function handleCardAdd(title) {
    const cardId = `card-${uuidv4()}`;
    const card = {
      ...newCard,
      id: cardId,
      title: title,
    };
    addNewCard(list.id, card);
    setNewCard(cardTemplate);
  }

  return (
    <div className="listContainer h-auto p-2 w-80 bg-gray-200 rounded-lg">
      <div
        {...dragHandleProps}
        className="listHeader flex justify-between items-center mb-2 p-1"
      >
        <span className="text-sm font-bold">{list.title}</span>
        <button
          className="p-1 rounded-md hover:bg-gray-400"
          onClick={deleteList}
        >
          <FiMoreHorizontal />
        </button>
      </div>
      <Droppable droppableId={list.id}>
        {(provided) => (
          <ul
            // pass necessary props to make the list droppable
            {...provided.droppableProps}
            // bind ref to DOM element
            ref={provided.innerRef}
            className="min-h-1"
          >
            {listCards.map((card, index) => (
              <Draggable key={card.id} draggableId={card.id} index={index}>
                {(provided) => (
                  <Card
                    ref={provided.innerRef}
                    draggableProps={provided.draggableProps}
                    dragHandleProps={provided.dragHandleProps}
                    listId={list.id}
                    card={card}
                  />
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
      <AddNew type="card" multiAddMode={true} handleAddNew={handleCardAdd} />
    </div>
  );
}
