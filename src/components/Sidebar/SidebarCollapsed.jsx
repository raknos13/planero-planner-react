import { FiChevronRight } from "react-icons/fi";

export const SidebarCollapsed = ({ isCollapsed, setIsCollapsed }) => {
  return (
    <div
      className="h-full flex-shrink-0 w-6 cursor-pointer hover:bg-bg-primary bg-bg-secondary border-r border-border"
      onClick={() => setIsCollapsed(false)}
    >
      <div className="m-0.5 mt-1">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute bg-bg-secondary hover:bg-bg-secondary text-text-primary border-2
            border-border p-1 ml-1 rounded-full"
        >
          <FiChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};
