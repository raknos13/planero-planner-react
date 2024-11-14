import { SidebarProvider, useAuth } from "../contexts";
import { Navbar, Board, Sidebar } from "./";
import HomePage from "./HomePage";
import AuthPage from "./AuthPage";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export default function Main() {
  const { isLoading, isLoggedIn } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <div className="h-svh w-svh overflow-hidden flex flex-col">
        <Routes>
          <Route
            path="/"
            element={
              isLoggedIn ? (
                <>
                  <Navbar />
                  <div className="flex flex-grow">
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
      </div>
    </BrowserRouter>
  );
}
