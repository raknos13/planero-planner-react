// import { FiGithub } from "react-icons/fi";
import { FaGithub, FaStar } from "react-icons/fa6";

export const GithubButton = ({ link }) => {
  return (
    <a href={link} target="_blank">
      <div className="flex justify-center items-center gap-2 bg-bg-primary border-t border-border p-2 hover:bg-bg-secondary transition-all duration-200 ease-linear">
        <button>
          <FaGithub size={16} />
        </button>
        <span className="text-sm">Star on GitHub</span>
        <button className="hover:text-yellow-200">
          <FaStar />
        </button>
      </div>
    </a>
  );
};
