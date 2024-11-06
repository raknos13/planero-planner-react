import notFound from "../../assets/not-found.svg";
import { FiPlus } from "react-icons/fi";

export const EmptyBoard = () => {
  return (
    <div className="flex flex-col justify-start items-center w-full space-y-4 px-4 overflow-x-auto">
      <figure>
        <img src={notFound} alt="Not found svg" className="h-64 mt-10" />
      </figure>
      <div className="flex flex-col items-center text-gray-700 text-lg">
        <p>Uh-uh! No boards present</p>
        <p> Click to add a new board</p>
      </div>
      <div className="relative w-44">
        <button
          className="flex items-center cursor-pointer transition-all bg-blue-500 text-white px-6 py-2 rounded-lg
border-blue-600 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
          style={{ position: "absolute", top: 0 }}
        >
          <FiPlus size={20} />
          Add New Board
        </button>
      </div>
    </div>
  );
};
