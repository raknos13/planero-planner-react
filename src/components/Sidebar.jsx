import { FiChevronLeft, FiChevronRight, FiPlus } from "react-icons/fi";
import { useState } from "react";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div
      className={`h-full flex-shrink-0 transition-all ease-linear duration-100 ${isCollapsed ? "w-10" : "w-52"} bg-gray-200`}
    >
      {!isCollapsed && (
        <div>
          <div className="flex justify-between items-center p-3 border-b border-b-slate-400">
            <h1 className="font-bold text-xs">User&apos;s workspace</h1>
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hover:bg-gray-400 p-1 rounded-md"
            >
              <FiChevronLeft size={18} />
            </button>
          </div>
          <div className="boardList">
            <div className="flex justify-between items-center px-3 py-2">
              <h6 className="text-sm font-bold">Your boards</h6>
              <button className="hover:bg-gray-400 p-1 rounded-md">
                <FiPlus size={18} />
              </button>
            </div>
          </div>
          <ul>
            <li>
              <button className="px-3 py-2 w-full text-sm flex justify-start align-baseline">
                <span className="w-5 h-max rounded-sm mr-2 bg-red-500">
                  &nbsp;
                </span>
                <span>My test board</span>
              </button>
            </li>
          </ul>
        </div>
      )}
      {isCollapsed && (
        <div className="m-2">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hover:bg-gray-400 p-1 rounded-md"
          >
            <FiChevronRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
