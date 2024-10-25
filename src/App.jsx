import Board from "./components/Board.jsx";
import Sidebar from "./components/Sidebar.jsx";

export default function App() {
  return (
    <div className="h-screen w-screen">
      <h1 className="text-md font-bold text-start p-4 bg-gray-200">
        Planero project manager
      </h1>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 mt-2">
          <Board />
        </div>
      </div>
    </div>
  );
}
