import {
  AutoResizeTextarea,
  MoreOptionsPopover,
  BoardCreatorPopover,
} from "../shared";
import { useSidebar, useBoardContext } from "../../contexts";
import { useRef } from "react";
import { FiTrello, FiPlus, FiMoreHorizontal } from "react-icons/fi";

export const BoardListHeader = ({ handleCreateBoard, addButtonRef }) => {
  const { showBoardCreator, setShowBoardCreator } = useSidebar();
  return (
    <div className="relative flex justify-between items-center px-3 py-2">
      <div className="flex items-center gap-2">
        <FiTrello size={15} />
        <h6 className="text-sm font-bold">Your boards</h6>
      </div>
      <button
        ref={addButtonRef}
        className="hover:bg-bg-secondary p-1 rounded-md"
        onClick={() => setShowBoardCreator(true)}
      >
        <FiPlus size={18} />
      </button>
      <div className="absolute top-8 left-12 right-0">
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

  return (
    <li
      key={board.id}
      className={`relative flex items-center w-full gap-2 py-2 px-3 text-xs cursor-pointer hover:bg-bg-secondary
                  ${board.id === activeBoardId && "bg-bg-card font-medium text-text-primary"}`}
      onClick={() => {
        switchBoard(board.id);
      }}
    >
      {/* <div className={`py-2 text-sm flex items-center justify-between gap-2`}> */}
      <div
        className="w-3 h-3 flex-shrink-0 rounded-full"
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
        className={`hover:bg-bg-primary p-1 rounded-md transition-colors`}
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
