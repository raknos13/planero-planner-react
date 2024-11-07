import { FaTrello } from "react-icons/fa";
// import { FiUser, FiGithub } from "react-icons/fi";
import { LuGithub, LuUser } from "react-icons/lu";
import { DarkModeToggle } from "./shared/DarkModeToggle";

export const Header = () => {
  return (
    <div className="flex justify-between items-center px-3 py-2 bg-bg-secondary text-text-primary border-b border-border z-30">
      <div className="flex items-center gap-2">
        <FaTrello size={20} />
        <h1 className="text-md font-bold text-center">
          Planero project manager
        </h1>
      </div>
      <section className="flex justify-evenly items-center gap-4">
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
        <button
          className="rounded-full trasnsition-colors duration-200 p-1
             hover:shadow-lg hover:bg-bg-hover transition-all"
        >
          <LuUser size={26} />
        </button>
      </section>
    </div>
  );
};
