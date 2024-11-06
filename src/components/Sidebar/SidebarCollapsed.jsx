import { FiChevronRight } from "react-icons/fi";

export const SidebarCollapsed = ({ isCollapsed, setIsCollapsed }) => {
  return (
    <div
      className="h-full flex-shrink-0 w-8 cursor-pointer hover:bg-gray-300 bg-gray-200"
      onClick={() => setIsCollapsed(false)}
    >
      <div className="m-0.5 mt-3">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hover:bg-gray-400 p-1 rounded-md"
        >
          <FiChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};
