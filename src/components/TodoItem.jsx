import { useState, forwardRef } from "react";
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

  function handleSubmit(e) {
    e.preventDefault();
    handleEdit(task.id, editedTitle);
    setIsEditing(false);
  }

  return (
    <li
      ref={ref}
      {...draggableProps}
      {...dragHandleProps}
      className="flex items-center justify-start gap-3 bg-white p-4 mb-3 rounded-lg shadow-lg hover:bg-gray-50 cursor-pointer"
    >
      <input type="checkbox" checked={task.completed} />{" "}
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
          <button type="submit">
            <AiOutlineCheck />
          </button>
          <button onClick={() => setIsEditing(false)}>
            <AiOutlineClose />
          </button>
        </form>
      ) : (
        <div className="flex justify-between gap-2">
          <div>{task.title}</div>
          <div>
            <button onClick={() => setIsEditing(true)}>
              <AiOutlineEdit
                className="text-gray-500 hover:text-blue-500 cursor-pointer"
                size={20}
              />
            </button>{" "}
            <button onClick={() => handleDelete(task.id)}>
              <AiOutlineDelete
                className="text-gray-500 hover:text-red-500 cursor-pointer"
                size={20}
              />
            </button>
          </div>
        </div>
      )}
    </li>
  );
}

export default forwardRef(TodoItem);
