import { AiOutlinePlus } from "react-icons/ai";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useState } from "react";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(0);

  return (
    <div
      className={`h-screen ${isCollapsed ? "w-10" : "w-52"} flex-shrink-0 bg-gray-200`}
    >
      {!isCollapsed && (
        <div className="flex justify-between align-center p-2">
          <span className="font-bold">Your boards</span>
          <div>
            <AiOutlinePlus />
          </div>
          <button onClick={() => setIsCollapsed(!isCollapsed)}>
            <FiChevronLeft />
          </button>
        </div>
      )}
      {isCollapsed && (
        <div>
          <button onClick={() => setIsCollapsed(!isCollapsed)}>
            <FiChevronRight />
          </button>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
