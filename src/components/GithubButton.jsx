import { FiGithub } from "react-icons/fi";
const GithubButton = ({ link }) => {
  return (
    <a href={link} target="_blank">
      <div className="flex justify-center items-center gap-1 bg-gray-300 p-2 hover:bg-gray-700 hover:text-white transition-all duration-200 ease-linear">
        <button>
          <FiGithub size={16} />
        </button>
        <span className="text-sm">View on GitHub</span>
      </div>
    </a>
  );
};

export default GithubButton;
