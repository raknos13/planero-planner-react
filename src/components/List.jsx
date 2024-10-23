import { useState, useRef, useEffect } from "react";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import { AiOutlinePlus, AiOutlineClose } from "react-icons/ai";
import Card from "./Card";
import { v4 as uuidv4 } from "uuid";

export default function List({
  list,
  cards,
  deleteCard,
  addCard,
  editCard,
  dragHandleProps,
}) {
  const cardTemplate = {
    id: "Add a unique ID",
    title: "",
    description: "Add a description",
    labels: "",
    completed: false,
  };
  const [newCard, setNewCard] = useState(cardTemplate);
  const [isAddingNewCard, setIsAddingNewCard] = useState(false);
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current && isAddingNewCard) {
      textareaRef.current.focus();
    }
  }, [isAddingNewCard]);

  function handleSubmit(e) {
    e.preventDefault();
    addCard(list.id, newCard);
    setNewCard(cardTemplate);
    // setIsAddingNewCard(false);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      handleSubmit(e);
    }
    if (e.key === "Escape") {
      setIsAddingNewCard(false);
      setNewCard(cardTemplate);
    }
  }

  return (
    <div className="container mx-2 p-2 bg-gray-200 rounded-xl w-[300px] h-min">
      <div {...dragHandleProps}>
        <div className="font-bold mb-2 p-1">
          <span>{list.title}</span>
        </div>
      </div>
      <Droppable droppableId="droppable">
        {(provided) => (
          <ul
            // pass necessary props to make the list droppable
            {...provided.droppableProps}
            // bind ref to DOM element
            ref={provided.innerRef}
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

      {isAddingNewCard && (
        <textarea
          placeholder="Enter a title..."
          value={newCard.title}
          ref={textareaRef}
          onChange={(e) =>
            setNewCard({
              ...newCard,
              id: uuidv4(),
              title: e.target.value,
            })
          }
          onKeyDown={handleKeyDown}
          onBlur={() => {
            setIsAddingNewCard(false);
            setNewCard(cardTemplate);
          }}
          className="mb-1 p-2 w-full rounded-lg text-sm"
        />
      )}

      <div className="flex">
        <button
          onClick={() => setIsAddingNewCard(true)}
          className="flex justify-start cards-center gap-2 p-2 bg-gray-200 rounded-md w-full text-sm hover:bg-gray-400"
        >
          <AiOutlinePlus />
          <span>Add new card</span>
        </button>
        {isAddingNewCard && (
          <button
            onClick={() => setIsAddingNewCard(false)}
            className="p-1 px-2 rounded-md hover:bg-gray-400"
          >
            <AiOutlineClose />
          </button>
        )}
      </div>
    </div>
  );
}
