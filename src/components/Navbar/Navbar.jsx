import { FaTrello } from "react-icons/fa";
import { LuGithub } from "react-icons/lu";
import { DarkModeToggle } from "../shared/DarkModeToggle";
import { DropDownMenu } from "./";
import { useAuth } from "../../contexts";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const { isLoggedIn, handleLogout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center px-3 py-2 bg-bg-secondary text-text-primary border-b border-border z-30 shadow-md">
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <FaTrello size={20} />
        <h1 className="text-md font-bold text-center">Planero</h1>
      </div>
      <section className="flex justify-evenly items-center gap-3">
        <DarkModeToggle />
        <button
          className="rounded-full trasnsition-colors duration-200 p-1
             hover:shadow-lg hover:bg-bg-hover transition-all"
        >
          <a
            href="https://github.com/mksonkar/planero-trello-clone-react"
            target="_blank"
          >
            <LuGithub size={26} />
          </a>
        </button>
        {isLoggedIn ? (
          <DropDownMenu
            onLogout={() => {
              handleLogout();
              navigate("/");
            }}
          />
        ) : (
          <button
            className="inline-flex items-center px-2 py-1 border border-gray-300 shadow-sm text-base font-medium rounded-md text-bg-primary bg-text-primary hover:bg-text-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onClick={() => navigate("/auth")}
          >
            Log in
          </button>
        )}
      </section>
    </div>
  );
};
