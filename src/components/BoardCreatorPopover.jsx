import { useState, useRef, useEffect } from "react";
import { FiX } from "react-icons/fi";

const BOARD_COLORS = [
  { name: "Sky", value: "#0EA5E9" },
  { name: "Purple", value: "#A855F7" },
  { name: "Pink", value: "#EC4899" },
  { name: "Green", value: "#22C55E" },
  { name: "Yellow", value: "#EAB308" },
  { name: "Red", value: "#EF4444" },
];

const BoardCreatorPopover = ({ onClose, onCreateBoard, buttonRef }) => {
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
      className="absolute top-32 left-6 mt-2 p-2 z-50 w-64 bg-white rounded-lg shadow-lg border border-gray-200"
    >
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold text-gray-700">Create board</h3>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-200"
        >
          <FiX size={16} />
        </button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-2">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Board Name
          </label>
          <input
            ref={inputRef}
            type="text"
            value={boardName}
            onChange={(e) => setBoardName(e.target.value)}
            placeholder="Enter board name"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Background
          </label>
          <div className="grid grid-cols-6 gap-2">
            {BOARD_COLORS.map((color) => (
              <button
                key={color.value}
                onClick={() => setSelectedColor(color.value)}
                title={color.name}
                className={`w-8 h-8 rounded-full border-2 ${selectedColor === color.value ? "border-blue-500" : "border-transparent hover:scale-105"}`}
                style={{ backgroundColor: color.value }}
              />
            ))}
          </div>
        </div>
        <button
          type="submit"
          disabled={!boardName.trim()}
          className="w-full bg-blue-500 rounded-md py-2 px-4 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          Create board
        </button>
      </form>
    </div>
  );
};

export default BoardCreatorPopover;
