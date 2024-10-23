import { useState, useRef, useEffect } from "react";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import { AiOutlinePlus, AiOutlineClose } from "react-icons/ai";
import Card from "./Card";
import { v4 as uuidv4 } from "uuid";
import AddNew from "./AddNew";
import { TiLeaf } from "react-icons/ti";

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
    if (!title.trim()) return;
    const cardId = `card-${uuidv4()}`;
    const card = {
      ...newCard,
      id: cardId,
      title: title,
    };

    addCard(cardId, card);
    setNewCard(cardTemplate);
  }

  return (
    <div className="container mx-2 p-2 bg-gray-200 rounded-xl w-[300px] h-min">
      <div {...dragHandleProps}>
        <div className="font-bold mb-2 p-1">
          <span>{list.title}</span>
        </div>
      </div>
      <Droppable droppableId={list.id}>
        {(provided) => (
          <ul
            // pass necessary props to make the list droppable
            {...provided.droppableProps}
            // bind ref to DOM element
            ref={provided.innerRef}
            // className="min-h-[10px]"
          >
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
        )}
      </Droppable>

      <AddNew type="card" handleAddNew={handleCardAdd} />
    </div>
  );
}
