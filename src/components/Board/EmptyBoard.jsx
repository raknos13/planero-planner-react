export const EmptyBoard = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-4 w-full">
      <div>No boards present. Click to add new board</div>
      <button
        // className="p-3 bg-green-400 hover:bg-green-500 rounded-lg"
        className="cursor-pointer transition-all bg-blue-500 text-white px-6 py-2 rounded-lg
border-blue-600 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
      >
        Add New Board
      </button>
    </div>
  );
};
