import { useState, useRef, useEffect } from "react";
import { FiX } from "react-icons/fi";
import { toast } from "react-toastify";

const BOARD_COLORS = [
  { name: "Sky", value: "rgba(14, 165, 233, 1)" },
  { name: "Purple", value: "rgba(168, 85, 247, 1)" },
  { name: "Pink", value: "rgba(236, 72, 153, 1)" },
  { name: "Green", value: "rgba(24, 218, 126, 1)" },
  { name: "Yellow", value: "rgba(234, 179, 8, 1)" },
  { name: "Red", value: "rgba(239, 68, 68, 1)" },
];

export const BoardCreatorPopover = ({ onClose, onCreateBoard, buttonRef }) => {
  const [boardName, setBoardName] = useState("");
  const [selectedColor, setSelectedColor] = useState(BOARD_COLORS[0].value);
  const popoverRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    // Focus input on mount
    inputRef.current?.focus();

    // hanle clicking outside
    function handleClickOutside(event) {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose, buttonRef]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreateBoard(boardName.trim(), selectedColor);
    toast.success("Board created successfully 🎉", {
      autoClose: 2000,
    });
    onClose();
  };

  return (
    <div
      ref={popoverRef}
      className="absolute left-0 top-0 z-50 mt-0 w-64 rounded-lg border border-border bg-primary px-3 py-3 text-text-primary shadow-lg"
    >
      <div className="mb-2 flex items-center justify-between">
        <h3 className="font-semibold">Create board</h3>
        <button
          onClick={onClose}
          className="rounded-full p-2 text-text-secondary hover:bg-secondary hover:text-text-primary"
        >
          <FiX size={16} />
        </button>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
        <div>
          <label className="mb-1 block text-sm font-medium">Board Name</label>
          <input
            ref={inputRef}
            type="text"
            value={boardName}
            onChange={(e) => setBoardName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                onClose();
              }
            }}
            placeholder="Enter board name"
            className="w-full rounded-md border border-border bg-secondary px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium">Background</label>
          <div className="mb-2 grid grid-cols-6 gap-2">
            {BOARD_COLORS.map((color) => (
              <button
                key={color.value}
                type="button"
                onClick={() => setSelectedColor(color.value)}
                title={color.name}
                className={`h-8 w-8 rounded-full border-2 
                    ${selectedColor === color.value ? "border-accent" : "border-transparent hover:scale-105 hover:border-accent-hover"}`}
                style={{ backgroundColor: color.value }}
              />
            ))}
          </div>
        </div>
        <button
          type="submit"
          disabled={!boardName.trim()}
          className="disabled:secondary w-full rounded-md bg-accent px-4 py-2 text-primary transition-colors hover:bg-accent-hover disabled:cursor-not-allowed"
        >
          Create board
        </button>
      </form>
    </div>
  );
};
