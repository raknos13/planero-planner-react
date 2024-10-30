import Board from "./Board.jsx";
import Sidebar from "./Sidebar.jsx";
import Header from "./Header.jsx";
import { BoardProvider } from "./BoardContext";

export default function Main() {
  return (
    <BoardProvider>
      <div className="h-screen w-screen overflow-hidden flex flex-col">
        <Header />
        <div className="flex flex-grow">
          <Sidebar />
          <Board />
        </div>
      </div>
    </BoardProvider>
  );
}
