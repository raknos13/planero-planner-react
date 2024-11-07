import { FiChevronRight } from "react-icons/fi";

export const SidebarCollapsed = ({ isCollapsed, setIsCollapsed }) => {
  return (
    <div
      className="h-full flex-shrink-0 w-6 cursor-pointer hover:bg-secondary bg-primary border-r border-secondary"
      onClick={() => setIsCollapsed(false)}
    >
      <div className="m-0.5 mt-3">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute bg-secondary text-text hover:bg-primary p-1 ml-1 rounded-lg"
        >
          <FiChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};
