import { useAuth, useBoardContext, useTheme } from "@/contexts";
import { FiChevronLeft, FiHome } from "react-icons/fi";

export const SidebarHeader = ({ isCollapsed, setIsCollapsed }) => {
  const { currentUser } = useAuth();
  const { activeBoardId } = useBoardContext();
  const { theme } = useTheme();

  return (
    <div
      className={`flex items-center justify-between border-b px-3 py-2 ${activeBoardId ? "border-border" : theme === "light" ? "border-gray-300" : "border-border"}`}
    >
      <div className="flex items-center gap-2">
        <FiHome size={20} />
        <h1 className="text-sm font-bold">
          {currentUser.displayName || "User's"} workspace
        </h1>
      </div>
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="rounded-md p-1 hover:bg-white/30"
      >
        <FiChevronLeft size={18} />
      </button>
    </div>
  );
};
