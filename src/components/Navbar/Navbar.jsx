import { FaTrello } from "react-icons/fa";
import { LuGithub } from "react-icons/lu";
import { DarkModeToggle } from "../shared/DarkModeToggle";
import { UserIcon } from "./";
import { useAuth } from "../../contexts";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

export const Navbar = () => {
  const { isLoggedIn, handleLogout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center px-3 py-2 bg-bg-secondary text-text-primary border-b border-border z-30">
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <FaTrello size={20} />
        <h1 className="text-md font-bold text-center">
          Planero project manager
        </h1>
      </div>
      <section className="flex justify-evenly items-center gap-3">
        <DarkModeToggle />
        <button
          className="rounded-full trasnsition-colors duration-200 p-1
             hover:shadow-lg hover:bg-bg-hover transition-all"
        >
          <a
            href="https://github.com/raknos13/planero-trello-clone-react"
            target="_blank"
          >
            <LuGithub size={26} />
          </a>
        </button>
        {isLoggedIn ? (
          <UserIcon
            onLogout={() => {
              handleLogout();
              navigate("/");
            }}
          />
        ) : (
          <Button onClick={() => navigate("/login")}>Log in</Button>
        )}
      </section>
    </div>
  );
};
