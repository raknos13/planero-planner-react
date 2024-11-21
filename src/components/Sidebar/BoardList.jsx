import {
  AutoResizeTextarea,
  MoreOptionsPopover,
  BoardCreatorPopover,
} from "../shared";
import { useSidebar, useBoardContext, useTheme } from "../../contexts";
import { useRef } from "react";
import { FiTrello, FiPlus, FiMoreHorizontal } from "react-icons/fi";
import { toast } from "react-toastify";

export const BoardListHeader = ({ handleCreateBoard, addButtonRef }) => {
  const { showBoardCreator, setShowBoardCreator } = useSidebar();
  return (
    <div className="relative flex items-center justify-between px-3 py-2">
      <div className="flex items-center gap-2">
        <FiTrello size={15} />
        <h6 className="text-sm font-bold">Your boards</h6>
      </div>
      <button
        ref={addButtonRef}
        className="rounded-md p-1 hover:bg-white/30"
        onClick={() => setShowBoardCreator(true)}
      >
        <FiPlus size={18} />
      </button>
      <div className="absolute left-12 right-0 top-8">
        {showBoardCreator && (
          <BoardCreatorPopover
            onClose={() => setShowBoardCreator(false)}
            onCreateBoard={handleCreateBoard}
            buttonRef={addButtonRef}
          />
        )}
      </div>
    </div>
  );
};

export const BoardList = ({
  boards,
  editedTitle,
  setEditedTitle,
  handleTitleSubmit,
  inputRef,
  handleEdit,
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
  const { theme } = useTheme();

  return (
    <li
      key={board.id}
      className={`flex w-full cursor-pointer items-center gap-2 px-3 py-1 hover:bg-white/20
                  ${board.id === activeBoardId && "font-medium text-white backdrop-blur-sm"}`}
      style={{
        backgroundColor:
          board.id === activeBoardId &&
          (theme === "dark"
            ? "hsla(0, 0%, 50%, 0.7)"
            : "hsla(0, 0%, 70%, 0.6)"),
      }}
      onClick={() => {
        switchBoard(board.id);
      }}
    >
      {/* <div className={`py-2 text-sm flex items-center justify-between gap-2`}> */}
      <div
        className="h-3.5 w-3.5 flex-shrink-0 rounded-full"
        style={{ backgroundColor: board.color }}
      />
      {editingBoardId === board.id ? (
        <AutoResizeTextarea
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
          className="w-full rounded-md p-1 text-sm font-normal"
        />
      ) : (
        <div className="flex w-full min-w-0 items-center">
          <span className="w-full min-w-0 flex-1 break-words pr-1 text-sm">
            {board.title}
          </span>
          <div className="flex-shrink-0 opacity-100">
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
        className={`relative z-0 rounded-md p-1 transition-colors hover:bg-white/30`}
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
          toast.error("Board deleted successfully 🗑️", { autoClose: 2000 });
        }}
        callButtonRef={buttonRef}
      />
    </>
  );
};
