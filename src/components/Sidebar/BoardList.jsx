import { BoardCreatorPopover, MoreOptionsPopover } from "../shared";
import { useBoardContext } from "../Board";
import { useSidebar } from "./context/SidebarContext";
import { useRef } from "react";
import { FiMoreHorizontal } from "react-icons/fi";

export const BoardList = ({
  boards,
  editedTitle,
  setEditedTitle,
  handleTitleSubmit,
  inputRef,
  showBoardCreator,
  setShowBoardCreator,
  handleCreateBoard,
  handleEdit,
  addButtonRef,
}) => {
  return (
    <>
      <ul className="flex-1">
        {Object.values(boards).map((board) => (
          <BoardListItem
            key={board.id}
            board={board}
            inputRef={inputRef}
            editedTitle={editedTitle}
            setEditedTitle={setEditedTitle}
            handleTitleSubmit={handleTitleSubmit}
            handleEdit={handleEdit}
          />
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
  );
};

const BoardListItem = ({
  board,
  inputRef,
  editedTitle,
  setEditedTitle,
  handleTitleSubmit,
  handleEdit,
}) => {
  const { activeBoardId, switchBoard } = useBoardContext();
  const { editingBoardId, setEditingBoardId } = useSidebar();

  return (
    <li
      key={board.id}
      className={`relative flex items-center w-full gap-2 py-2 px-3 text-sm cursor-pointer 
                  ${board.id === activeBoardId && "bg-gray-300"}`}
      onClick={() => {
        switchBoard(board.id);
      }}
    >
      {/* <div className={`py-2 text-sm flex items-center justify-between gap-2`}> */}
      <div
        className="w-3 h-3 flex-shrink-0 bg-red-400 rounded-full"
        style={{ backgroundColor: board.color }}
      />
      {editingBoardId === board.id ? (
        <input
          ref={inputRef}
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleTitleSubmit(board.id);
            }
            if (e.key === "Escape") {
              setEditingBoardId(null);
            }
          }}
          onBlur={() => handleTitleSubmit(board.id)}
          onClick={(e) => e.stopPropagation()}
          type="text"
          className="w-full rounded-md p-1"
        />
      ) : (
        <div className="flex w-full min-w-0">
          <span className="pr-1 w-full flex-1 break-words text-sm min-w-0">
            {board.title}
          </span>
          <div className="flex-shrink-0">
            <BoardListItemActions board={board} handleEdit={handleEdit} />
          </div>
        </div>
      )}
      {/* </div> */}
    </li>
  );
};

const BoardListItemActions = ({ board, handleEdit }) => {
  const { switchBoard, deleteBoard } = useBoardContext();
  const { activePopoverBoard, setActivePopoverBoard } = useSidebar();
  const buttonRef = useRef(null);

  return (
    <>
      <button
        ref={buttonRef}
        onClick={(e) => {
          e.stopPropagation();
          switchBoard(board.id);
          setActivePopoverBoard(board.id);
        }}
        className="hover:bg-gray-400 p-1 rounded-md transition-colors"
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
        callButtonRef={buttonRef}
      />
    </>
  );
};
