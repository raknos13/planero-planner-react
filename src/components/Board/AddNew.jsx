import { useState, useRef, useEffect } from "react";
import { AiOutlinePlus, AiOutlineClose } from "react-icons/ai";
import { AutoResizeTextarea } from "../shared";

export const AddNew = ({ type, multiAddMode = true, handleAddNew, id }) => {
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
      // If id is provided (for cards), pass both id and title
      // If no id (for lists), just pass the title
      if (id) {
        handleAddNew(id, newTitle);
      } else {
        handleAddNew(newTitle);
      }
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
      setIsAddingNew(false);
    } else {
      handleCancel();
    }
  }

  if (!isAddingNew) {
    return (
      <button
        onClick={() => setIsAddingNew(true)}
        className="flex items-center gap-2 p-2 bg-bg-primary text-text-primary rounded-md w-full text-sm hover:bg-bg-card"
      >
        <AiOutlinePlus />
        <span>Add new {type}</span>
      </button>
    );
  }

  return (
    <div className="flex flex-col p-1 text-text-primary h-min rounded-lg w-full space-y-1">
      <AutoResizeTextarea
        placeholder="Enter a title..."
        value={newTitle}
        ref={inputRef}
        onChange={(e) => setNewTitle(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        className="mb-1 p-2 rounded-md text-sm resize-none border-border bg-bg-card focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {/* {type === "card" ? ( */}
      {/*   <AutoResizeTextarea */}
      {/*     placeholder="Enter a title..." */}
      {/*     value={newTitle} */}
      {/*     ref={inputRef} */}
      {/*     onChange={(e) => setNewTitle(e.target.value)} */}
      {/*     onKeyDown={handleKeyDown} */}
      {/*     onBlur={handleBlur} */}
      {/*     className="mb-1 p-2 px-4 rounded-lg text-sm min-h-[60px] resize-none bg-secondary text-text" */}
      {/*   /> */}
      {/* ) : ( */}
      {/*   <input */}
      {/*     placeholder="Enter a title..." */}
      {/*     value={newTitle} */}
      {/*     ref={inputRef} */}
      {/*     onChange={(e) => setNewTitle(e.target.value)} */}
      {/*     onKeyDown={handleKeyDown} */}
      {/*     onBlur={handleBlur} */}
      {/*     className="mb-1 p-2 px-3 w-full rounded-lg text-sm" */}
      {/*   /> */}
      {/* )} */}

      <div className="flex gap-2">
        <button
          onClick={handleSubmit}
          className="flex-grow px-3 py-1.5 bg-accent hover:bg-accent-hover text-bg-primary rounded-md text-sm"
        >
          Add {type}
        </button>
        <button
          onClick={handleCancel}
          className="px-3 py-1.5 bg-bg-secondary rounded-md hover:bg-bg-primary text-sm"
        >
          <AiOutlineClose />
        </button>
      </div>
    </div>
  );
};
