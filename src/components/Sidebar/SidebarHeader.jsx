import { useAuth } from "@/contexts";
import { FiChevronLeft, FiHome } from "react-icons/fi";

export const SidebarHeader = ({ isCollapsed, setIsCollapsed }) => {
  const { currentUser } = useAuth();

  return (
    <div className="flex justify-between items-center px-3 py-2 border-b border-border">
      <div className="flex gap-2 items-center">
        <FiHome size={15} />
        <h1 className="font-bold text-xs">
          {currentUser.displayName || User} &apos;s workspace
        </h1>
      </div>
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="hover:bg-bg-secondary p-1 rounded-md"
      >
        <FiChevronLeft size={18} />
      </button>
    </div>
  );
};
