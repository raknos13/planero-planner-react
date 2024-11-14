import { Draggable, Droppable } from "@hello-pangea/dnd";
import { FiMoreHorizontal } from "react-icons/fi";
import { useState, useRef, useEffect } from "react";
import { Card, AddNew } from "./";
import { AutoResizeTextarea, MoreOptionsPopover } from "../shared";
import { useBoardContext } from "../../contexts";

export function List({ list, listCards, dragHandleProps }) {
  const { deleteList, editList, addNewCard, boards, activeBoardId } =
    useBoardContext();
  const [showPopover, setShowPopover] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(list.title);
  const inputRef = useRef(null);
  const showPopoverRef = useRef(null);

  const activeBoard = boards[activeBoardId];
  const boardColor = activeBoard.color;

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
      inputRef.current?.select();
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
      setEditedTitle(list.title);
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
    <div
      className="listContainer relative p-2 w-64 max-h-[calc(100vh-5rem)] rounded-lg flex flex-col
      border-1 border-border hover:border-border-hover text-text-primary bg-bg-primary"
    >
      <div {...dragHandleProps} className="listHeader w-full gap-1 mb-2 p-1">
        {isEditing ? (
          <AutoResizeTextarea
            ref={inputRef}
            placeholder="Type list title"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            className="px-2 py-1 w-full text-sm rounded-md"
          />
        ) : (
          <div className="relative flex w-full">
            <span className="pr-8 break-words text-sm font-bold min-w-0 flex-1">
              {list.title}
            </span>
            <button
              className="absolute top-0 right-0 p-1 rounded-md hover:bg-text-secondary hover:text-bg-primary hover:opacity-50 transition-colors"
              onClick={() => setShowPopover(true)}
              ref={showPopoverRef}
            >
              <FiMoreHorizontal />
            </button>
          </div>
        )}
        <MoreOptionsPopover
          heading="List"
          isOpen={showPopover}
          onClose={() => setShowPopover(false)}
          onEdit={handleEdit}
          onDelete={() => deleteList(list.id)}
          callButtonRef={showPopoverRef}
        />
      </div>
      <div className="flex flex-col flex-1 min-h-0">
        <div className="flex-1 overflow-y-auto">
          <Droppable droppableId={list.id}>
            {(provided, snapshot) => (
              <ul
                // pass necessary props to make the list droppable
                {...provided.droppableProps}
                // bind ref to DOM element
                ref={provided.innerRef}
                className={`min-h-1 rounded-lg`}
                style={{
                  backgroundColor: snapshot.isDraggingOver
                    ? boardColor.replace("1)", "0.1)")
                    : "",
                }}
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
        </div>
        <div className="flex-shrink-0">
          <AddNew
            type="card"
            multiAddMode={true}
            id={list.id}
            handleAddNew={addNewCard}
          />
        </div>
      </div>
    </div>
  );
}
