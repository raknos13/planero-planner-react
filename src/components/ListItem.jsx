import { useState, forwardRef, useRef, useEffect } from "react";
import {
  AiOutlineEdit,
  AiOutlineDelete,
  AiOutlineCheck,
  AiOutlineClose,
} from "react-icons/ai";

const ListItem = forwardRef(function ListItem(
  { listId, card, handleDelete, handleEdit, draggableProps, dragHandleProps },
  ref,
) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(card.title);
  const textareaRef = useRef(null);

  // focus on the textarea and select the previous text
  // when user clicks on the edit btn
  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.select();
      autoResizeTextArea();
    }
  }, [isEditing]);

  function handleSubmit(e) {
    e.preventDefault();
    if (editedTitle.trim()) {
      handleEdit(listId, card.id, { ...card, title: editedTitle });
      setIsEditing(false);
    }
  }

  // automatically resize textarea
  // based on the lines of text
  function autoResizeTextArea() {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }

  function handleCheckboxChange() {
    handleEdit(card.id, { ...card, completed: !card.completed });
  }

  function handleKeyDown(e) {
    // Submit the edit, when enter is pressed.
    // and Shift enter inserts a new line
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
    if (e.key === "Escape") {
      setIsEditing(false);
      setEditedTitle(card.title);
    }
  }

  return (
    <div className="relative w-full group">
      <li
        ref={ref}
        {...draggableProps}
        {...dragHandleProps}
        className="text-sm bg-white p-2 rounded-lg shadow mb-2 flex cards-center justify-between border-2 border-transparent hover:border-2 hover:border-blue-500"
      >
        <input
          type="checkbox"
          checked={card.completed}
          onChange={handleCheckboxChange}
          className="mr-2"
        />
        {isEditing ? (
          <form
            onSubmit={handleSubmit}
            className="flex gap-2 cards-center w-full"
          >
            <textarea
              value={editedTitle}
              ref={textareaRef}
              // wrap="soft"
              rows={1}
              onChange={(e) => {
                setEditedTitle(e.target.value);
                autoResizeTextArea();
              }}
              onKeyDown={handleKeyDown}
              className="resize-none w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="text-green-600 p-1 rounded-md border border-gray-100 hover:bg-green-400 hover:text-white"
            >
              <AiOutlineCheck size={20} /> {/* confirm edit */}
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                setEditedTitle(card.title);
              }}
              className="text-red-600 p-1 rounded-md border border-gray-100 hover:bg-red-400 hover:text-white"
            >
              <AiOutlineClose size={20} /> {/* cancel edit */}
            </button>
          </form>
        ) : (
          <div className="flex justify-between cards-center w-full">
            <div>
              <span
                className={`w-full ${card.completed ? "line-through text-gray-500" : ""}`}
              >
                {card.title}
              </span>
            </div>
            {/* Hide buttons by default, show on hover */}
            <div className="absolute top-1 right-2 gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white">
              <button
                onClick={() => setIsEditing(true)}
                className="hover:bg-yellow-600 hover:text-white rounded-md p-1 transition-colors duration-200"
              >
                <AiOutlineEdit size={20} />
              </button>{" "}
              <button
                onClick={() => handleDelete(list.id, card.id)}
                className="hover:bg-red-600 hover:text-white rounded-md p-1 transition-colors duration-200"
              >
                <AiOutlineDelete size={20} />
              </button>
            </div>
          </div>
        )}
      </li>
    </div>
  );
});

export default ListItem;
