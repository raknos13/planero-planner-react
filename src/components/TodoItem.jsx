import { useState } from "react";

export default function TodoItem({ task, handleDelete, handleEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);

  function handleSubmit(e) {
    e.preventDefault();
    handleEdit(task.id, editedTitle);
    setIsEditing(false);
  }

  return (
    <li>
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
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={() => handleDelete(task.id)}>Delete</button>
        </>
      )}
    </li>
  );
}
