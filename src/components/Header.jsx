import { FaUserCircle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";
import { DarkModeToggle } from "./shared/DarkModeToggle";

const Header = () => {
  return (
    <div className="flex justify-between items-center px-3 py-0.5 bg-background text-text border-b border-border z-30">
      <h1 className="text-md font-bold text-center">Planero project manager</h1>
      <section className="flex justify-evenly items-center gap-4">
        <a
          href="https://github.com/raknos13/planero-trello-clone-react"
          target="_blank"
        >
          <button
            className="rounded-full trasnsition-colors duration-200 p-1
            hover:text-white hover:shadow-lg hover:bg-black transition-all"
          >
            <FaGithub size={26} />
          </button>
        </a>
        <DarkModeToggle />
        <button
          className="cursor-not-allowed rounded-full trasnsition-colors duration-200 p-1
            hover:text-white hover:shadow-lg hover:bg-black transition-all"
        >
          <FaUserCircle size={26} />
        </button>
      </section>
    </div>
  );
};

export default Header;
