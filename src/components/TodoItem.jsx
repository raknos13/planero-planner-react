import { useState, forwardRef, useRef } from "react";
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

  function handleSubmit(e) {
    e.preventDefault();
    if (editedTitle.trim()) {
      handleEdit(task.id, { ...task, title: editedTitle });
      setIsEditing(false);
    }
  }

  return (
    <li
      ref={ref}
      {...draggableProps}
      {...dragHandleProps}
      className="bg-white p-4 rounded-md shadow mb-2 flex items-center justify-between"
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
          {/* <input */}
          {/*   type="textarea" */}
          {/*   value={editedTitle} */}
          {/*   onChange={(e) => setEditedTitle(e.target.value)} */}
          {/*   className="w-full p-2 border rounded-md" */}
          {/* /> */}
          <textarea
            value={editedTitle}
            ref={textareaRef}
            wrap="soft"
            onChange={(e) => {
              setEditedTitle(e.target.value);
              // e.target.autofocus = true;
              textareaRef.current.autofocus = true;
            }}
            className="w-full p-2 border rounded-md"
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
        <div className="flex justify-between items-center w-full">
          <div>
            <span>{task.title}</span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setIsEditing(true)}
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
