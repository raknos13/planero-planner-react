import { Draggable, Droppable } from "@hello-pangea/dnd";
import Card from "./Card";
import AddNew from "./AddNew";
import { useState, useRef, useEffect } from "react";
import { useBoardContext } from "./BoardContext";
import ListOptionsPopover from "./ListOptionsPopover";
import { FiMoreHorizontal } from "react-icons/fi";

export default function List({ list, listCards, dragHandleProps }) {
  const { deleteList, editList, addNewCard } = useBoardContext();
  const [showPopover, setShowPopover] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(list.title);
  const inputRef = useRef(null);
  const showPopoverRef = useRef(null);

  useEffect(() => {
    if (isEditing) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  function handleTitleSubmit() {
    if (editedTitle.trim() !== "") {
      editList(list.id, editedTitle.trim());
      setIsEditing(false);
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      handleTitleSubmit();
    } else if (e.key === "Escape") {
      setEditedTitle("");
      setIsEditing(false);
    }
  }

  function handleBlur() {
    handleTitleSubmit();
  }

  function handleEdit() {
    setIsEditing(true);
  }

  return (
    <div className="listContainer relative p-2 w-64 bg-gray-200 rounded-lg flex flex-col h-min">
      <div
        {...dragHandleProps}
        className="listHeader flex justify-between items-center mb-2 p-1"
      >
        {isEditing ? (
          <input
            ref={inputRef}
            type="text"
            placeholder="Type list title"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            className="rounded-md"
          />
        ) : (
          <span className="text-sm font-bold">{list.title}</span>
        )}
        <button
          className="p-1 rounded-md hover:bg-gray-400 transition-colors"
          onClick={() => setShowPopover(true)}
          ref={showPopoverRef}
        >
          <FiMoreHorizontal />
        </button>
        <ListOptionsPopover
          isOpen={showPopover}
          onClose={() => setShowPopover(false)}
          onEdit={handleEdit}
          onDelete={() => deleteList(list.id)}
          callButtonRef={showPopoverRef}
        />
      </div>
      <div className="max-h-[calc(100vh-9rem)] overflow-y-scroll flex flex-col">
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
        <AddNew
          type="card"
          multiAddMode={true}
          id={list.id}
          handleAddNew={addNewCard}
        />
      </div>
    </div>
  );
}
