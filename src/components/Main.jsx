import { SidebarProvider, useAuth } from "../contexts";
import { Navbar, Board, Sidebar } from "./";
import HomePage from "./HomePage";
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export default function Main() {
  const { isLoading, isLoggedIn } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              isLoggedIn ? (
                <div className="flex flex-grow">
                  <SidebarProvider>
                    <Sidebar />
                  </SidebarProvider>
                  <Board />
                </div>
              ) : (
                <HomePage />
              )
            }
          />
          <Route
            path="/login"
            element={isLoggedIn ? <Navigate to="/" /> : <LoginPage />}
          />
          <Route
            path="/signup"
            element={isLoggedIn ? <Navigate to="/" /> : <SignupPage />}
          />
          {/* Catch-all route for 404 */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
