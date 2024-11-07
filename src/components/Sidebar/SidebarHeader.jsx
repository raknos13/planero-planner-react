import { FiChevronLeft, FiHome } from "react-icons/fi";

export const SidebarHeader = ({ isCollapsed, setIsCollapsed }) => {
  return (
    <div className="flex justify-between items-center px-3 py-1 border-b border-border">
      <div className="flex gap-2 items-center">
        <FiHome size={15} />
        <h1 className="font-bold text-xs">User&apos;s workspace</h1>
      </div>
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="hover:bg-secondary p-1 rounded-md"
      >
        <FiChevronLeft size={18} />
      </button>
    </div>
  );
};
