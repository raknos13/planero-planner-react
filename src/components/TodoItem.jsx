import { useState, forwardRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
      className="bg-white p-4 mb-3 rounded-lg shadow-lg hover:bg-gray-50 cursor-pointer"
    >
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
          <button type="submit">Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </form>
      ) : (
        <>
          {task.title}
          <button onClick={() => setIsEditing(true)}>
            <FontAwesomeIcon icon="fa-regular fa-pen-to-square" />
            Edit
          </button>
          <button onClick={() => handleDelete(task.id)}>Delete</button>
        </>
      )}
    </li>
  );
}

export default forwardRef(TodoItem);
