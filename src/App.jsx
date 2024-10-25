import Board from "./components/Board.jsx";
import Sidebar from "./components/Sidebar.jsx";

export default function App() {
  return (
    <div className="h-screen w-screen flex">
      <Sidebar />
      <div>
        <h1 className="text-2xl font-bold text-center mb-4">
          Planero project manager
        </h1>
        <div className="flex-1">
          <Board />
        </div>
      </div>
    </div>
  );
}
