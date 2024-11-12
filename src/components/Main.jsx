import { SidebarProvider, useAuth } from "../contexts";
import { Navbar, Board, Sidebar } from "./";
import HomePage from "./HomePage";

export default function Main() {
  const { isLoading, isLoggedIn } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col">
      <Navbar />
      {isLoggedIn ? (
        <div className="flex flex-grow">
          <SidebarProvider>
            <Sidebar />
          </SidebarProvider>
          <Board />
        </div>
      ) : (
        <HomePage />
      )}
    </div>
  );
}
