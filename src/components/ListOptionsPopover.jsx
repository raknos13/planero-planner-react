import { useRef, useEffect } from "react";
import { FiX } from "react-icons/fi";

const ListOptionsPopover = ({ isOpen, onClose, onEdit, onDelete }) => {
  const popoverRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (!popoverRef && !popoverRef.current.contains(event.target)) {
        onClose();
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={popoverRef}
      className="flex flex-col top-10 left-16 absolute z-50 w-48 h-32 text-sm mb-2 rounded-md shadow-lg border border-gray-300 bg-white"
    >
      <div className="flex justify-between p-3">
        <h2 className="font-semibold">List options</h2>
        <button
          onClick={onClose}
          className="rounded-full p-1 hover:bg-gray-300"
        >
          <FiX />
        </button>
      </div>
      <div className="flex flex-col items-start">
        <button
          onClick={() => {
            onEdit();
            onClose();
          }}
          className="w-full h-8 hover:bg-gray-100 px-4"
        >
          Edit
        </button>
        <button
          onClick={onDelete}
          className="w-full h-8 hover:bg-gray-100 px-4"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ListOptionsPopover;
