import notFound from "../../assets/not-found.svg";
import { FiPlus } from "react-icons/fi";
import { BoardCreatorPopover } from "../shared";
import { useState, useRef } from "react";
import { useBoardContext } from "../../contexts";

export const EmptyBoard = () => {
  const { addNewBoard } = useBoardContext();
  const [showBoardCreator, setShowBoardCreator] = useState(false);
  const buttonRef = useRef(null);

  function handleCreateBoard(title, color) {
    addNewBoard(title, color);
  }

  return (
    <div className="relative flex flex-col justify-start items-center w-svw space-y-4 px-4 overflow-x-auto bg-bg-primary text-text-primary">
      <figure>
        <img src={notFound} alt="Not found svg" className="h-64 mt-10" />
      </figure>
      <div className="relative right-32 bottom-44">
        {showBoardCreator && (
          <BoardCreatorPopover
            onClose={() => setShowBoardCreator(false)}
            onCreateBoard={handleCreateBoard}
            buttonRef={buttonRef}
          />
        )}
      </div>
      <div className="flex flex-col items-center text-lg">
        <p>Uh-uh! No boards present</p>
        <p> Click to add a new board</p>
      </div>
      <div className="relative w-44">
        <button
          className="flex items-center cursor-pointer transition-all bg-blue-500 text-white px-6 py-2 rounded-lg
                     border-blue-600 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
                     active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
          style={{ position: "absolute", top: 0 }}
          onClick={() => setShowBoardCreator(true)}
          ref={buttonRef}
        >
          <FiPlus size={20} />
          Add New Board
        </button>
      </div>
    </div>
  );
};
