import { FiChevronLeft } from "react-icons/fi";

export const SidebarHeader = ({ isCollapsed, setIsCollapsed }) => {
  return (
    <div className="flex justify-between items-center p-3 border-b border-b-slate-400">
      <h1 className="font-bold text-xs">User&apos;s workspace</h1>
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="hover:bg-gray-400 p-1 rounded-md"
      >
        <FiChevronLeft size={18} />
      </button>
    </div>
  );
};
