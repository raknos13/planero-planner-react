import { SidebarProvider, useAuth } from "../contexts";
import { Navbar, Board, Sidebar } from "./";
import HomePage from "./HomePage";
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";

function ProtectedRoute({ children }) {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }
  return children;
}

export default function Main() {
  const { isLoading, isLoggedIn } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col">
      <Navbar />
      {/* {isLoggedIn ? ( */}
      {/*   <div className="flex flex-grow"> */}
      {/*     <SidebarProvider> */}
      {/*       <Sidebar /> */}
      {/*     </SidebarProvider> */}
      {/*     <Board /> */}
      {/*   </div> */}
      {/* ) : ( */}
      {/*   <HomePage /> */}
      {/* )} */}
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              isLoggedIn ? (
                <ProtectedRoute>
                  <div className="flex flex-grow">
                    <SidebarProvider>
                      <Sidebar />
                    </SidebarProvider>
                    <Board />
                  </div>
                </ProtectedRoute>
              ) : (
                <HomePage />
              )
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          {/* Catch-all route for 404 */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
