import { useState, useRef, useEffect } from "react";
import { FiX } from "react-icons/fi";

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
    onClose();
  };

  return (
    <div
      ref={popoverRef}
      className="absolute top-0 left-0 mt-0 py-3 px-3 z-50 w-64 bg-primary text-text-primary rounded-lg shadow-lg border border-border"
    >
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold">Create board</h3>
        <button
          onClick={onClose}
          className="text-text-secondary hover:text-text-primary p-2 rounded-full hover:bg-secondary"
        >
          <FiX size={16} />
        </button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-2 flex flex-col">
        <div>
          <label className="block text-sm font-medium mb-1">Board Name</label>
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
            className="w-full px-3 py-2 bg-secondary border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Background</label>
          <div className="grid grid-cols-6 gap-2 mb-2">
            {BOARD_COLORS.map((color) => (
              <button
                key={color.value}
                type="button"
                onClick={() => setSelectedColor(color.value)}
                title={color.name}
                className={`w-8 h-8 rounded-full border-2 
                    ${selectedColor === color.value ? "border-accent" : "border-transparent hover:border-accent-hover hover:scale-105"}`}
                style={{ backgroundColor: color.value }}
              />
            ))}
          </div>
        </div>
        <button
          type="submit"
          disabled={!boardName.trim()}
          className="w-full rounded-md py-2 px-4 text-primary bg-accent hover:bg-accent-hover disabled:secondary disabled:cursor-not-allowed transition-colors"
        >
          Create board
        </button>
      </form>
    </div>
  );
};
