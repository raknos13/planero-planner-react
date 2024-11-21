import notFound from "../../assets/not-found.svg";
import { FiPlus } from "react-icons/fi";
import { BoardCreatorPopover } from "../shared";
import { useState, useRef, useEffect } from "react";
import { useBoardContext, useTheme } from "../../contexts";
import { toast, ToastContainer } from "react-toastify";

export const EmptyBoard = () => {
  const { addNewBoard } = useBoardContext();
  const { theme } = useTheme();
  const [showBoardCreator, setShowBoardCreator] = useState(false);
  const buttonRef = useRef(null);

  useEffect(() => {
    toast.info(
      `Oops! You deleted all boards 😢\nClick + to create a new board`,
    );
  }, []);

  function handleCreateBoard(title, color) {
    addNewBoard(title, color);
  }

  return (
    <div className="w-svw relative flex flex-col items-center justify-start space-y-4 overflow-x-auto bg-primary px-4 text-text-primary">
      <ToastContainer className="mt-10" theme={theme} />
      <figure>
        <img src={notFound} alt="Not found svg" className="mt-10 h-64" />
      </figure>
      <div className="relative bottom-44 right-32">
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
          className="flex cursor-pointer items-center rounded-lg border-b-[4px] border-blue-600 bg-blue-500 px-6 py-2
                     text-white transition-all hover:-translate-y-[1px] hover:border-b-[6px] hover:brightness-110
                     active:translate-y-[2px] active:border-b-[2px] active:brightness-90"
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
