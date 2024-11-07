import { BoardProvider, SidebarProvider, ThemeProvider } from "../contexts";
import { Header, Board, Sidebar } from "./";

export default function Main() {
  return (
    <BoardProvider>
      <ThemeProvider>
        <div className="h-screen w-screen overflow-hidden flex flex-col">
          <Header />
          <div className="flex flex-grow">
            <SidebarProvider>
              <Sidebar />
            </SidebarProvider>
            <Board />
          </div>
        </div>
      </ThemeProvider>
    </BoardProvider>
  );
}
