import { useState, forwardRef, useRef, useEffect } from "react";
import { FiX, FiCheck, FiEdit, FiTrash } from "react-icons/fi";
import { useBoardContext } from "./";
import { AutoResizeTextarea } from "../shared";

export const Card = forwardRef(function Card(
  { listId, card, draggableProps, dragHandleProps },
  ref,
) {
  const { deleteCard, editCard } = useBoardContext();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(card.title);
  const textareaRef = useRef(null);

  // focus on the textarea and select the previous text
  // when user clicks on the edit btn
  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.select();
    }
  }, [isEditing]);

  function handleSubmit(e) {
    e.preventDefault();
    if (editedTitle.trim()) {
      editCard(card.id, { ...card, title: editedTitle });
      setIsEditing(false);
    }
  }

  // function handleCheckboxChange() {
  //   editCard(card.id, { ...card, completed: !card.completed });
  // }

  function handleKeyDown(e) {
    // Submit the edit, when enter is pressed.
    // and Shift enter inserts a new line
    if (e.key === "Enter" && !e.shiftKey) {
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
        className="text-sm border-box mb-1.5 p-2 rounded-lg shadow flex items-center justify-between 
                  bg-bg-card border-1 border-border text-text-primary hover:border-blue-500"
      >
        {/* <input */}
        {/*   type="checkbox" */}
        {/*   checked={card.completed} */}
        {/*   onChange={handleCheckboxChange} */}
        {/*   className="mr-2" */}
        {/* /> */}
        {isEditing ? (
          <form
            onSubmit={handleSubmit}
            className="flex gap-2 items-center w-full"
          >
            <AutoResizeTextarea
              value={editedTitle}
              ref={textareaRef}
              onChange={(e) => {
                setEditedTitle(e.target.value);
              }}
              onKeyDown={handleKeyDown}
              className="resize-none w-full p-2 border-border rounded-md bg-bg-secondary focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {/* <textarea */}
            {/*   value={editedTitle} */}
            {/*   ref={textareaRef} */}
            {/*   // wrap="soft" */}
            {/*   rows={1} */}
            {/*   onChange={(e) => { */}
            {/*     setEditedTitle(e.target.value); */}
            {/*     autoResizeTextArea(); */}
            {/*   }} */}
            {/*   onKeyDown={handleKeyDown} */}
            {/*   className="resize-none w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500" */}
            {/* /> */}
            <button
              type="submit"
              className="text-green-600 p-1 rounded-md hover:bg-green-400 hover:text-white"
            >
              <FiCheck size={16} /> {/* confirm edit */}
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                setEditedTitle(card.title);
              }}
              className="text-red-600 p-1 rounded-md hover:bg-red-400 hover:text-white"
            >
              <FiX size={16} /> {/* cancel edit */}
            </button>
          </form>
        ) : (
          <div className="flex justify-between items-center w-full max-w-full">
            <div className="w-full max-w-full">
              <span
                // className={`${card.completed ? "line-through text-gray-500" : ""}`}
                className="break-words"
              >
                {card.title}
              </span>
            </div>
            {/* Hide buttons by default, show on hover */}
            <div className="absolute top-1.5 right-2 gap-0 hidden group-hover:flex transition-opacity duration-300 bg-secondary">
              <button
                onClick={() => setIsEditing(true)}
                className="text-gray-400 hover:bg-gray-100 hover:text-gray-700 rounded-md p-1 transition-colors duration-200"
              >
                <FiEdit size={16} />
              </button>{" "}
              <button
                onClick={() => deleteCard(listId, card.id)}
                className="text-red-400 hover:bg-gray-100 hover:text-red-600 rounded-md p-1 transition-colors duration-200"
              >
                <FiTrash size={16} />
              </button>
            </div>
          </div>
        )}
      </li>
    </div>
  );
});
