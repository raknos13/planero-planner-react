import { useState } from "react";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import { FiMoreHorizontal } from "react-icons/fi";
import Card from "./Card";
import { v4 as uuidv4 } from "uuid";
import AddNew from "./AddNew";

export default function List({
  list,
  cards,
  deleteCard,
  addCard,
  editCard,
  dragHandleProps,
}) {
  const cardTemplate = {
    id: "",
    title: "",
    description: "Add a description",
    labels: "",
    completed: false,
  };
  const [newCard, setNewCard] = useState(cardTemplate);

  function handleCardAdd(title) {
    const cardId = `card-${uuidv4()}`;
    const card = {
      ...newCard,
      id: cardId,
      title: title,
    };
    addCard(list.id, card);
    setNewCard(cardTemplate);
  }

  return (
    <div className="h-auto mx-2 p-2 w-80 bg-gray-200 rounded-xl snap-start">
      <div
        className="flex justify-between items-center mb-2 p-1"
        {...dragHandleProps}
      >
        <span className="text-sm font-bold">{list.title}</span>
      </div>
      <Droppable droppableId={list.id}>
        {(provided) => (
          <div
            // pass necessary props to make the list droppable
            {...provided.droppableProps}
            // bind ref to DOM element
            ref={provided.innerRef}
            // className="min-h-[10px]"
          >
            <ul>
              {cards.map((card, index) => (
                <Draggable key={card.id} draggableId={card.id} index={index}>
                  {(provided) => (
                    <Card
                      ref={provided.innerRef}
                      draggableProps={provided.draggableProps}
                      dragHandleProps={provided.dragHandleProps}
                      listId={list.id}
                      card={card}
                      handleEdit={editCard}
                      handleDelete={deleteCard}
                    />
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          </div>
        )}
      </Droppable>
      <AddNew type="card" handleAddNew={handleCardAdd} />
    </div>
  );
}
