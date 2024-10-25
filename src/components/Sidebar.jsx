import { FiChevronLeft, FiChevronRight, FiPlus } from "react-icons/fi";
import { useState } from "react";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div
      className={`h-screen transition-all ease-linear duration-200 ${isCollapsed ? "w-10" : "w-52"} flex-shrink-0 bg-gray-200`}
    >
      {!isCollapsed && (
        <div className="flex justify-between align-center p-3 ">
          <h1 className="font-bold text-sm">User's workspace</h1>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hover:bg-gray-400 p-1 rounded-md"
          >
            <FiChevronLeft size={18} />
          </button>
          {/* <div> */}
          {/*   <FiPlus /> */}
          {/* </div> */}
        </div>
      )}
      {isCollapsed && (
        <div className="m-2">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hover:bg-gray-400 p-1 rounded-md"
          >
            <FiChevronRight />
          </button>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
