import { AiOutlinePlus } from "react-icons/ai";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useState } from "react";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(0);

  return (
    <div
      className={`h-screen transition-all ease-linear duration-200 ${isCollapsed ? "w-10" : "w-52"} flex-shrink-0 bg-gray-200`}
    >
      {!isCollapsed && (
        <div className="flex justify-between align-center p-2">
          <span className="font-bold">Your boards</span>
          <div>
            <AiOutlinePlus />
          </div>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hover:bg-gray-400 p-1 m-1 rounded-md"
          >
            <FiChevronLeft />
          </button>
        </div>
      )}
      {isCollapsed && (
        <div>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hover:bg-gray-400 p-1 m-1 rounded-md"
          >
            <FiChevronRight />
          </button>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
