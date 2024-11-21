import { useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { FiX, FiEdit3, FiTrash2 } from "react-icons/fi";
import { toast } from "react-toastify";

export const MoreOptionsPopover = ({
  heading = "More",
  isOpen,
  onClose,
  onEdit,
  onDelete,
  callButtonRef,
}) => {
  const popoverRef = useRef(null);
  const buttonRect = callButtonRef.current?.getBoundingClientRect();

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

  // Calculate position based on button position
  const getPopoverPosition = () => {
    if (!buttonRect) return {};

    return {
      position: "fixed",
      top: `${buttonRect.bottom + window.scrollY}px`,
      left: `${buttonRect.left + window.scrollX}px`,
    };
  };

  const popoverContent = (
    <div
      ref={popoverRef}
      className="z-50 h-32 w-40 rounded-md border border-border bg-bg-card text-sm text-text-primary opacity-100 shadow-lg"
      style={getPopoverPosition()}
    >
      <div className="flex items-center justify-between p-3">
        <h2 className="font-semibold">{heading} options</h2>
        <button
          onClick={onClose}
          className="hover:text-text rounded-full p-1 text-text-secondary hover:bg-secondary"
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
          className="flex h-8 w-full items-center justify-start gap-1 px-4 text-left hover:bg-secondary"
        >
          <FiEdit3 />
          Edit
        </button>
        <button
          onClick={(e) => {
            confirm(
              `${heading} will be permanently deleted! (There is no undo) \nDo you want to proceed?`,
            ) && onDelete(e);
            onClose();
            toast.error(`${heading} deleted successfully 🗑️`);
          }}
          className="flex h-8 w-full items-center justify-start gap-1 px-4 text-left hover:bg-red-400"
        >
          <FiTrash2 />
          Delete
        </button>
      </div>
    </div>
  );
  if (!isOpen) return null;
  return createPortal(popoverContent, document.body);
};
