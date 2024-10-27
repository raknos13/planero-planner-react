import Board from "./Board.jsx";
import Sidebar from "./Sidebar.jsx";
import Header from "./Header.jsx";

export default function Main() {
  return (
    <div className="h-screen w-screen overflow-hidden">
      <Header />
      <div className="flex">
        <Sidebar />
        <div className="flex-1 mt-2">
          <Board />
        </div>
      </div>
    </div>
  );
}
