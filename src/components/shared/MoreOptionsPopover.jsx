import { useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";
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
      className="z-50 opacity-100 w-40 h-32 text-sm rounded-md shadow-lg border border-border bg-bg-card text-text-primary"
      style={getPopoverPosition()}
    >
      <div className="flex justify-between items-center p-3">
        <h2 className="font-semibold">{heading} options</h2>
        <button
          onClick={onClose}
          className="rounded-full p-1 text-text-secondary hover:text-text hover:bg-bg-secondary"
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
          className="flex justify-start items-center gap-1 w-full h-8 hover:bg-bg-secondary px-4 text-left"
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
          }}
          className="flex justify-start items-center gap-1 w-full h-8 hover:bg-red-400 px-4 text-left"
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
