import {
  AuthProvider,
  BoardProvider,
  SidebarProvider,
  ThemeProvider,
} from "../contexts";
import { Navbar, Board, Sidebar } from "./";

export default function Main() {
  return (
    <AuthProvider>
      <BoardProvider>
        <ThemeProvider>
          <div className="h-screen w-screen overflow-hidden flex flex-col">
            <Navbar />
            <div className="flex flex-grow">
              <SidebarProvider>
                <Sidebar />
              </SidebarProvider>
              <Board />
            </div>
          </div>
        </ThemeProvider>
      </BoardProvider>
    </AuthProvider>
  );
}
