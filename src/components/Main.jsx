import { SidebarProvider, useAuth, useBoardContext } from "../contexts";
import { Navbar, Board, Sidebar } from "./";
import HomePage from "./HomePage";
import AuthPage from "./AuthPage";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export default function Main() {
  const { isLoading, isLoggedIn } = useAuth();
  const { boards, activeBoardId } = useBoardContext();

  const activeBoard = boards[activeBoardId];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center bg-black text-white h-screen w-screen">
        Loading...
      </div>
    );
  }

  return (
    <div
      className="h-screen w-screen flex flex-col"
      style={{
        background: activeBoard.color,
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              isLoggedIn ? (
                <>
                  <Navbar />
                  <div className="flex h-full w-full">
                    <SidebarProvider>
                      <Sidebar />
                    </SidebarProvider>
                    <Board />
                  </div>
                </>
              ) : (
                <>
                  <Navbar />
                  <HomePage />
                </>
              )
            }
          />
          <Route
            path="/auth"
            element={isLoggedIn ? <Navigate to="/" /> : <AuthPage />}
          />
          {/* Catch-all route for 404 */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
