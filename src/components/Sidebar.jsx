import {
  FiChevronLeft,
  FiChevronRight,
  FiPlus,
  FiMoreHorizontal,
} from "react-icons/fi";
import { useState, useRef, useEffect } from "react";
import { useBoardContext } from "./BoardContext";
import BoardCreatorPopover from "./BoardCreatorPopover";
import MoreOptionsPopover from "./MoreOptionsPopover";

const Sidebar = () => {
  const {
    boards,
    activeBoardId,
    switchBoard,
    addNewBoard,
    deleteBoard,
    editBoard,
  } = useBoardContext();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showBoardCreator, setShowBoardCreator] = useState(false);
  const [activePopoverBoard, setActivePopoverBoard] = useState(null);
  const [editingBoardId, setEditingBoardId] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const addButtonRef = useRef(null);
  const moreOptionsButtonRefs = useRef({});
  const inputRef = useRef(null);

  const handleCreateBoard = (title, color) => {
    addNewBoard(title, color);
  };

  useEffect(() => {
    if (editingBoardId) {
      inputRef.current?.focus();
    }
  }, [editingBoardId]);

  function handleTitleSubmit(boardId) {
    if (editedTitle.trim() !== "") {
      editBoard(boardId, editedTitle.trim());
      setEditingBoardId(null);
    }
  }

  function handleEdit(boardId) {
    setEditedTitle(boards[activeBoardId].title);
    setEditingBoardId(boardId);
    setActivePopoverBoard(null);
  }

  return (
    <div
      className={`h-full flex-shrink-0 transition-all ease-linear duration-100 
                  ${isCollapsed ? "w-8 cursor-pointer hover:bg-gray-300" : "w-52"} bg-gray-200`}
      onClick={() => {
        isCollapsed && setIsCollapsed(false);
      }}
    >
      {!isCollapsed && (
        <div>
          <div className="flex justify-between items-center p-3 border-b border-b-slate-400">
            <h1 className="font-bold text-xs">User&apos;s workspace</h1>
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hover:bg-gray-400 p-1 rounded-md"
            >
              <FiChevronLeft size={18} />
            </button>
          </div>
          <div className="boardList">
            <div className="flex justify-between items-center px-3 py-2">
              <h6 className="text-sm font-bold">Your boards</h6>
              <button
                ref={addButtonRef}
                className="hover:bg-gray-400 p-1 rounded-md"
                onClick={() => setShowBoardCreator(true)}
              >
                <FiPlus size={18} />
              </button>
            </div>
          </div>
          {!boards[activeBoardId] ? (
            <span className="p-3 text-xs text-gray-600">
              {/* If no boards exist show this message */}
              Click{" "}
              <span className="inline-block">
                <FiPlus />
              </span>{" "}
              to add a board
            </span>
          ) : (
            <>
              <ul>
                {Object.values(boards).map((board) => (
                  <li
                    key={board.id}
                    className={`relative flex justify-between px-3 cursor-pointer ${board.id === activeBoardId ? "bg-gray-300" : ""}`}
                    onClick={() => {
                      switchBoard(board.id);
                    }}
                  >
                    <div
                      className={`py-2 text-sm flex items-center justify-between gap-2`}
                    >
                      <div
                        className="w-3 h-3 bg-red-400 rounded-full"
                        style={{ backgroundColor: board.color }}
                      ></div>
                      {editingBoardId !== board.id ? (
                        <span>{board.title}</span>
                      ) : (
                        <input
                          ref={inputRef}
                          value={editedTitle}
                          onChange={(e) => setEditedTitle(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              handleTitleSubmit(board.id);
                            } else if (e.key === "Escape") {
                              setEditingBoardId(null);
                            }
                          }}
                          onBlur={() => handleTitleSubmit(board.id)}
                          onClick={(e) => e.stopPropagation()}
                          type="text"
                          className="w-36 rounded-md p-1"
                        />
                      )}
                    </div>
                    <button
                      ref={(el) =>
                        (moreOptionsButtonRefs.current[board.id] = el)
                      }
                      onClick={(e) => {
                        e.stopPropagation();
                        switchBoard(board.id);
                        setActivePopoverBoard(board.id);
                      }}
                    >
                      <FiMoreHorizontal />
                    </button>
                    <MoreOptionsPopover
                      heading="Board"
                      isOpen={activePopoverBoard === board.id}
                      onClose={() => setActivePopoverBoard(null)}
                      onEdit={() => handleEdit(board.id)}
                      onDelete={(e) => {
                        e.stopPropagation();
                        deleteBoard(board.id);
                      }}
                      callButtonRef={{
                        current: moreOptionsButtonRefs.current[board.id],
                      }}
                    />
                  </li>
                ))}
              </ul>
              {showBoardCreator && (
                <BoardCreatorPopover
                  onClose={() => setShowBoardCreator(false)}
                  onCreateBoard={handleCreateBoard}
                  buttonRef={addButtonRef}
                />
              )}
            </>
          )}
        </div>
      )}
      {isCollapsed && (
        <div className="m-0.5 mt-3">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hover:bg-gray-400 p-1 rounded-md"
          >
            <FiChevronRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
