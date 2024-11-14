import { useTheme } from "@/contexts";
import { FiChevronRight } from "react-icons/fi";

export const SidebarCollapsed = ({ isCollapsed, setIsCollapsed }) => {
  const { theme } = useTheme();
  return (
    <div
      className={`h-full flex-shrink-0 w-4 cursor-pointer backdrop-blur-sm border-r border-border
                ${theme === "dark" ? "bg-black/80 hover:bg-black/90" : "bg-black/50 hover:bg-black/60"}`}
      onClick={() => setIsCollapsed(false)}
    >
      <div className="mt-2">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`absolute z-30 opacity-100 text-gray-200 border-2
            border-border p-1 rounded-full
                ${theme === "dark" ? "bg-black/80 hover:bg-black/90" : "bg-black/50 hover:bg-black/60"}`}
          // style={{
          //   backgroundColor:
          //     theme === "dark"
          //       ? "hsla(0, 0%, 0%, 0.8)"
          //       : "hsla(0, 0%, 0%, 0.3)",
          // }}
        >
          <FiChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};
