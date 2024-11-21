import { FiPlus, FiChevronRight } from "react-icons/fi";
import { useState, useRef, useEffect } from "react";
import { useBoardContext, useSidebar, useTheme } from "../../contexts/";
import { GithubButton } from "../shared";
import { SidebarHeader, BoardList, BoardListHeader } from "./";

export const Sidebar = () => {
  const { boards, activeBoardId, addNewBoard, editBoard } = useBoardContext();
  const { theme } = useTheme();

  const {
    isCollapsed,
    setIsCollapsed,
    showBoardCreator,
    setShowBoardCreator,
    editingBoardId,
    setEditingBoardId,
    setActivePopoverBoard,
  } = useSidebar();

  const [editedTitle, setEditedTitle] = useState("");
  const addButtonRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (editingBoardId) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [editingBoardId]);

  const handleCreateBoard = (title, color) => {
    addNewBoard(title, color);
  };

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
      className={`z-20 flex-shrink-0 ${isCollapsed ? "w-4" : "w-52"} transition-width h-full border-r border-border bg-primary shadow-md backdrop-blur-sm duration-300 ease-in-out ${theme === "dark" ? "text-white" : activeBoardId ? "text-white" : "border-gray-300 text-text-primary"} `}
      style={{
        backgroundColor:
          activeBoardId !== null
            ? theme === "dark"
              ? "hsla(0, 0%, 0%, 0.8)"
              : "hsla(0, 0%, 0%, 0.6)"
            : "",
      }}
    >
      {isCollapsed ? (
        <div
          className={`h-full w-4 flex-shrink-0 cursor-pointer`}
          onClick={() => setIsCollapsed(false)}
        >
          <div className="mt-2">
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className={`absolute z-30 rounded-full border-2 border-border p-1 text-gray-200 opacity-100 ${theme === "dark" ? "bg-black/80 hover:bg-black/90" : "bg-black/50 hover:bg-black/60"}`}
            >
              <FiChevronRight size={16} />
            </button>
          </div>
        </div>
      ) : (
        <div className="flex h-full flex-col justify-between">
          <SidebarHeader
            isCollapsed={isCollapsed}
            setIsCollapsed={setIsCollapsed}
          />

          <BoardListHeader
            addButtonRef={addButtonRef}
            handleCreateBoard={handleCreateBoard}
          />

          {activeBoardId ? (
            <BoardList
              boards={boards}
              editedTitle={editedTitle}
              setEditedTitle={setEditedTitle}
              handleEdit={handleEdit}
              handleTitleSubmit={handleTitleSubmit}
              inputRef={inputRef}
              showBoardCreator={showBoardCreator}
              setShowBoardCreator={setShowBoardCreator}
              handleCreateBoard={handleCreateBoard}
              addButtonRef={addButtonRef}
            />
          ) : (
            <EmptyBoardMessage />
          )}
          <div className="mt-auto">
            <GithubButton link="https://github.com/mksonkar/planero-trello-clone-react" />
          </div>
        </div>
      )}
    </div>
  );
};

const EmptyBoardMessage = () => {
  return (
    <span className="ml-5 p-3 text-xs text-text-secondary">
      {/* If no boards exist show this message */}
      Click{" "}
      <span className="inline-block">
        <FiPlus />
      </span>{" "}
      to add a board
    </span>
  );
};
