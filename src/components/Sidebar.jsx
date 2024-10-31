import {
  FiChevronLeft,
  FiChevronRight,
  FiPlus,
  FiMoreHorizontal,
} from "react-icons/fi";
import { useState, useRef } from "react";
import { useBoardContext } from "./BoardContext";
import BoardCreatorPopover from "./BoardCreatorPopover";
import Board from "./Board";

const Sidebar = () => {
  const { boards, activeBoardId, switchBoard, addNewBoard, deleteBoard } =
    useBoardContext();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showBoardCreator, setShowBoardCreator] = useState(false);
  const addButtonRef = useRef(null);

  const handleCreateBoard = (title, color) => {
    addNewBoard(title, color);
  };

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
          <ul>
            {Object.values(boards).map((board) => (
              <li
                key={board.id}
                className={`flex justify-between px-3 ${board.id === activeBoardId ? "bg-gray-300" : ""}`}
              >
                <button
                  onClick={() => switchBoard(board.id)}
                  className={`py-2 text-sm`}
                >
                  <span>{board.title}</span>
                </button>
                <button onClick={() => deleteBoard(board.id)}>
                  <FiMoreHorizontal />
                </button>
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
