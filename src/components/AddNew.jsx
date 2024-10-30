import { useState, useRef, useEffect } from "react";
import { AiOutlinePlus, AiOutlineClose } from "react-icons/ai";

const AddNew = ({ type, multiAddMode = true, handleAddNew, id }) => {
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current && isAddingNew) {
      // ensure focus happens after DOM has rendered textarea
      const timeoutFocus = setTimeout(() => {
        inputRef.current.focus();
      }, 0);
      return () => clearTimeout(timeoutFocus);
    }
  }, [isAddingNew]);

  function handleSubmit() {
    if (newTitle.trim()) {
      handleAddNew(id, newTitle);
      setNewTitle("");
    }
    if (multiAddMode) {
      inputRef.current?.focus();
    } else {
      setIsAddingNew(false);
    }
  }

  function handleCancel() {
    setIsAddingNew(false);
    setNewTitle("");
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    } else if (e.key === "Escape") {
      e.preventDefault();
      handleCancel();
    }
  }

  function handleBlur() {
    if (newTitle.trim()) {
      handleSubmit();
    } else {
      handleCancel();
    }
  }

  if (!isAddingNew) {
    return (
      <button
        onClick={() => setIsAddingNew(true)}
        className="flex items-center gap-2 p-2 bg-gray-200 rounded-md w-full text-sm hover:bg-gray-400"
      >
        <AiOutlinePlus />
        <span>Add new {type}</span>
      </button>
    );
  }

  return (
    <div className="bg-gray-200 h-min rounded-lg w-full space-y-1">
      {type === "card" ? (
        <textarea
          placeholder="Enter a title..."
          value={newTitle}
          ref={inputRef}
          onChange={(e) => setNewTitle(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          className="mb-1 p-2 px-3 w-full rounded-lg text-sm min-h-[60px] resize-none"
        />
      ) : (
        <input
          placeholder="Enter a title..."
          value={newTitle}
          ref={inputRef}
          onChange={(e) => setNewTitle(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          className="mb-1 p-2 px-3 w-full rounded-lg text-sm"
        />
      )}

      <div className="flex gap-2">
        <button
          onClick={handleSubmit}
          className="flex-grow px-3 py-1.5 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
        >
          Add {type}
        </button>
        <button
          onClick={handleCancel}
          className="px-3 py-1.5 bg-gray-300 rounded hover:bg-gray-400 text-sm"
        >
          <AiOutlineClose />
        </button>
      </div>
    </div>
  );
};

export default AddNew;
