import { useState, useRef, useEffect } from "react";
import { AiOutlinePlus, AiOutlineClose } from "react-icons/ai";

const AddNew = ({ type, handleAddNew }) => {
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const inputRef = useRef(null);
  const isClickingAddButton = useRef(false);

  useEffect(() => {
    if (inputRef.current && isAddingNew) {
      const timeoutFocus = setTimeout(() => {
        inputRef.current.focus();
      }, 0);
      return () => clearTimeout(timeoutFocus);
    }
  }, [isAddingNew, newTitle]);

  function handleSubmit() {
    if (newTitle.trim()) {
      handleAddNew(newTitle);
      setNewTitle("");
    }
    setIsAddingNew(true);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
    if (e.key === "Escape") {
      setIsAddingNew(false);
      setNewTitle("");
    }
  }

  return (
    <div>
      {isAddingNew && (
        <textarea
          placeholder="Enter a title..."
          value={newTitle}
          ref={inputRef}
          onChange={(e) => setNewTitle(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => {
            if (!newTitle.trim() && !isClickingAddButton.current) {
              setIsAddingNew(false);
              setNewTitle("");
            }
          }}
          className="mb-1 p-2 w-full rounded-lg text-sm"
        />
      )}

      <div className="flex">
        <button
          onMouseDown={() => {
            isClickingAddButton.current = true;
          }}
          onClick={() => {
            setIsAddingNew(true);
            handleSubmit();
            inputRef.current?.focus();
            isClickingAddButton.current = false; //reset after handling click
          }}
          className="flex justify-start items-center gap-2 p-2 bg-gray-200 rounded-md w-full text-sm hover:bg-gray-400"
        >
          <AiOutlinePlus />
          <span>Add new {type}</span>
        </button>
        {isAddingNew && (
          <button
            onClick={() => {
              setIsAddingNew(false);
              setNewTitle("");
            }}
            className="p-1 px-2 rounded-md hover:bg-gray-400"
          >
            <AiOutlineClose />
          </button>
        )}
      </div>
    </div>
  );
};

export default AddNew;
