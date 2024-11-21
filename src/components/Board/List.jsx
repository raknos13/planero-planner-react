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
    <div className="listContainer border-1 relative flex max-h-[calc(100vh-8rem)] w-64 flex-col rounded-lg border-border bg-primary p-2 text-text-primary hover:border-border-hover">
      <div className="listHeader mb-2 w-full gap-1 p-1">
        {isEditing ? (
          <AutoResizeTextarea
            ref={inputRef}
            placeholder="Type list title"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            className="w-full rounded-md px-2 py-1 text-sm"
          />
        ) : (
          <div {...dragHandleProps} className="relative flex w-full">
            <span className="min-w-0 flex-1 break-words pr-8 text-sm font-bold">
              {list.title}
            </span>
            <button
              className="absolute right-0 top-0 rounded-md p-1 transition-colors hover:bg-text-secondary hover:text-primary hover:opacity-50"
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
      <div className="flex min-h-0 flex-1 flex-col">
        <div className="flex-1 overflow-y-auto scroll-smooth">
          <Droppable droppableId={list.id}>
            {(provided, snapshot) => (
              <ul
                // pass necessary props to make the list droppable
                {...provided.droppableProps}
                // bind ref to DOM element
                ref={provided.innerRef}
                className={`min-h-1 scroll-smooth rounded-lg`}
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
