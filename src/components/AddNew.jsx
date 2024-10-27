import { useState, useRef, useEffect } from "react";
import { AiOutlinePlus, AiOutlineClose } from "react-icons/ai";

const AddNew = ({ type, multiAddMode = true, handleAddNew }) => {
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const inputRef = useRef(null);
  const hasClickedAddButton = useRef(false);
  const hasPressedEscape = useRef(false);

  useEffect(() => {
    if (inputRef.current && isAddingNew) {
      // ensure focus happens after DOM has rendered textarea
      const timeoutFocus = setTimeout(() => {
        inputRef.current.focus();
      }, 0);
      return () => clearTimeout(timeoutFocus);
    }
  }, [isAddingNew]);

  // useEffect(() => {
  //   const handleGlobalKeyDown = (e) => {
  //     if (e.key === "Escape") {
  //       // e.preventDefault();
  //       hasPressedEscape.current = true;
  //       handleCancel();
  //     }
  //   };
  //
  //   window.addEventListener("keydown", handleGlobalKeyDown);
  //
  //   return () => {
  //     window.removeEventListener("keydown", handleGlobalKeyDown);
  //   };
  // }, []);

  function handleSubmit() {
    if (!isAddingNew) {
      // handle initial click to open textarea
      setIsAddingNew(true);
    } else {
      // subsequent clicks when textarea is open
      if (newTitle.trim()) {
        handleAddNew(newTitle);
        setNewTitle("");
      }
      if (!multiAddMode) {
        setIsAddingNew(false);
      } else {
        // Keep textarea focused after submission
        inputRef.current?.focus();
      }
    }
    // set to true onMouseDown event
    hasClickedAddButton.current = false; //reset after handling click
  }

  function handleCancel() {
    setIsAddingNew(false);
    setNewTitle("");
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (newTitle.trim()) {
        handleAddNew(newTitle);
        setNewTitle("");
      }
      multiAddMode ? setIsAddingNew(true) : setIsAddingNew(false);
    }
    // else if (e.key === "Escape") {
    // // e.preventDefault();
    // hasPressedEscape.current = true;
    // handleCancel();
    // // inputRef.current?.blur(); // Ensure focus leaves the textarea
    // }
  }

  function handleBlur() {
    // Only handle blur if we're not clicking the add button
    // don't add new if blur triggerd by pressing Escape

    // TODO: because pressing escape is triggering onBlur and not onKeyDown,
    // TODO: I'm disabling adding task on blur, and blur cancels
    // TODO: adding task, later implement escape to cancel task and blur adds new task if textarea not empty

    console.log(hasPressedEscape.current);
    // if (hasPressedEscape.current) {
    //   setTimeout(() => {
    //     hasPressedEscape.current = false;
    //   }, 0);
    //   return;
    // }
    // if (!hasClickedAddButton.current && newTitle.trim()) {
    //   handleAddNew(newTitle);
    //   setNewTitle("");
    // }
    // setIsAddingNew(false);
    handleCancel();
  }

  return (
    <div className="bg-gray-200 h-min rounded-lg w-full">
      {isAddingNew && type === "card" && (
        <textarea
          placeholder="Enter a title..."
          value={newTitle}
          ref={inputRef}
          onChange={(e) => setNewTitle(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          className="mb-1 p-2 px-3 w-full rounded-lg text-sm"
        />
      )}
      {isAddingNew && type === "list" && (
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

      <div className="flex w-full">
        <button
          onMouseDown={() => {
            hasClickedAddButton.current = true;
          }}
          onClick={handleSubmit}
          className="flex flex-grow justify-start items-center gap-2 p-2 bg-gray-200 rounded-md w-full text-sm hover:bg-gray-400"
        >
          <AiOutlinePlus />
          <span>Add new {type}</span>
        </button>
        {isAddingNew && (
          <button
            onClick={handleCancel}
            className="flex-shrink-0 p-1 px-2 rounded-md hover:bg-gray-400"
          >
            <AiOutlineClose />
          </button>
        )}
      </div>
    </div>
  );
};

export default AddNew;
