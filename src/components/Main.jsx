import { Board, BoardProvider } from "./Board";
import { Sidebar, SidebarProvider } from "./Sidebar";
import Header from "./Header";

export default function Main() {
  return (
    <BoardProvider>
      <div className="h-screen w-screen overflow-hidden flex flex-col">
        <Header />
        <div className="flex flex-grow">
          <SidebarProvider>
            <Sidebar />
          </SidebarProvider>
          <Board />
        </div>
      </div>
    </BoardProvider>
  );
}
