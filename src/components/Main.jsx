import Board from "./Board.jsx";
import Sidebar from "./Sidebar.jsx";
import Header from "./Header.jsx";
import { useBoardContext } from "./BoardContext.jsx";

export default function Main() {
  const { boards, activeBoardId, lists, cards } = useBoardContext();

  const activeBoard = boards[activeBoardId];

  const activeBoardLists = activeBoard.listIds.reduce((acc, listId) => {
    acc[listId] = lists[listId];
    return acc;
  }, {});

  const activeBoardCards = Object.values(lists).flatMap((list) =>
    list.cardIds.map((cardId) => cards[cardId]),
  );

  const boardData = {
    lists: activeBoardLists,
    cards: activeBoardCards,
    listOrder: activeBoard.listOrder,
  };

  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col">
      <Header />
      <div className="flex flex-grow">
        <Sidebar />
        <Board initialData={boardData} />
      </div>
    </div>
  );
}
