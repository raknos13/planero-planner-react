import { useRef, useEffect } from "react";
import { FiX, FiEdit3, FiTrash2 } from "react-icons/fi";

export const MoreOptionsPopover = ({
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
      className="top-9 left-28 absolute z-50 w-40 h-32 text-sm rounded-md shadow-lg border border-gray-300 bg-primary"
    >
      <div className="flex justify-between items-center p-3">
        <h2 className="font-semibold">{heading} options</h2>
        <button
          onClick={onClose}
          className="rounded-full p-1 text-gray-400 hover:text-text hover:bg-hover"
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
          className="flex justify-start items-center gap-1 w-full h-8 hover:bg-hover px-4 text-left"
        >
          <FiEdit3 />
          Edit
        </button>
        <button
          onClick={(e) => {
            confirm(
              `${heading} will be permanently deleted! Do you want to proceed?`,
            ) && onDelete(e);
            onClose();
          }}
          className="flex justify-start items-center gap-1 w-full h-8 hover:bg-red-400 px-4 text-left"
        >
          <FiTrash2 />
          Delete
        </button>
      </div>
    </div>
  );
};
