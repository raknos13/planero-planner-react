import { useRef, useEffect } from "react";
import { FiX } from "react-icons/fi";

const MoreOptionsPopover = ({
  heading = "More",
  isOpen,
  onClose,
  onEdit,
  onDelete,
  callButtonRef,
}) => {
  const popoverRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        popoverRef.current &&
        !popoverRef.current?.contains(event.target) &&
        !callButtonRef.current?.contains(event.target)
      ) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen, onClose, callButtonRef]);

  if (!isOpen) return null;

  return (
    <div
      ref={popoverRef}
      className="top-9 left-28 absolute z-50 w-36 h-32 text-sm mb-2 rounded-md shadow-lg border border-gray-300 bg-white"
    >
      <div className="flex justify-between items-center p-3">
        <h2 className="font-semibold text-gray-700">{heading} options</h2>
        <button
          onClick={onClose}
          className="rounded-full p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-200"
        >
          <FiX />
        </button>
      </div>
      <div>
        <button
          onClick={() => {
            onEdit();
            onClose();
          }}
          className="w-full h-8 hover:bg-gray-100 px-4 text-left"
        >
          Edit
        </button>
        <button
          onClick={onDelete}
          className="w-full h-8 hover:bg-gray-100 px-4 text-left"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default MoreOptionsPopover;
