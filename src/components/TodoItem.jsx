import { useState, forwardRef, useRef, useEffect } from "react";
import {
  AiOutlineEdit,
  AiOutlineDelete,
  AiOutlineCheck,
  AiOutlineClose,
} from "react-icons/ai";

function TodoItem(
  { task, handleDelete, handleEdit, draggableProps, dragHandleProps },
  ref,
) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);

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
      handleEdit(task.id, { ...task, title: editedTitle });
      setIsEditing(false);
    }
  }

  // automatically resize textarea
  // based on the lines of text
  function autoResizeTextArea() {
    const textarea = textareaRef.current;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  }

  return (
    <li
      ref={ref}
      {...draggableProps}
      {...dragHandleProps}
      className="text-sm bg-white p-2 rounded-lg shadow mb-2 flex items-center justify-between"
      style={{ position: "relative" }}
    >
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() =>
          handleEdit(task.id, { ...task, completed: !task.completed })
        }
        className="mr-2"
      />
      {isEditing ? (
        <form
          onSubmit={handleSubmit}
          className="flex gap-2 items-center w-full"
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
            onKeyDown={(e) => {
              // Submit the edit, when enter is pressed.
              if (e.key == "Enter") {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
            className="resize-none w-full p-2 border rounded-md"
          />
          <button
            type="submit"
            className="text-green-600 p-1 rounded-md border border-gray-100 hover:bg-green-400 hover:text-white"
          >
            <AiOutlineCheck size={20} /> {/* confirm edit */}
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="text-red-600 p-1 rounded-md border border-gray-100 hover:bg-red-400 hover:text-white"
          >
            <AiOutlineClose size={20} /> {/* cancel edit */}
          </button>
        </form>
      ) : (
        <div className="flex justify-between items-center w-full group">
          <div>
            <span className="w-full">{task.title}</span>
          </div>
          {/* Hide buttons by default, show on hover */}
          <div className="absolute top-1 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white">
            <button
              onClick={() => {
                setIsEditing(true);
              }}
              className="hover:bg-yellow-600 hover:text-white rounded-md p-1"
            >
              <AiOutlineEdit size={20} />
            </button>{" "}
            <button
              onClick={() => handleDelete(task.id)}
              className="hover:bg-red-600 hover:text-white rounded-md p-1"
            >
              <AiOutlineDelete size={20} />
            </button>
          </div>
        </div>
      )}
    </li>
  );
}

export default forwardRef(TodoItem);
