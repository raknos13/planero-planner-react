import { useAuth } from "@/contexts";
import { useState, useRef, useEffect } from "react";

export const DropDownMenu = ({ onLogout }) => {
  const { currentUser } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    onLogout();
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="flex items-center justify-center rounded-full h-8 w-8 bg-yellow-300 transition-colors duration-200 hover:shadow-lg hover:bg-bg-hover"
        onClick={toggleDropdown}
      >
        <span className="text-black flex-1">{currentUser.displayName[0]}</span>
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-60 bg-bg-card rounded-md shadow-lg z-10">
          <div className="flex items-center gap-2 p-4">
            <div className="w-8 h-8 rounded-full shrink-0 bg-yellow-300 text-black flex items-center justify-center">
              {currentUser.displayName[0]}
            </div>
            <div className="text-sm font-bold text-wrap break-words">
              <div>{currentUser.displayName}</div>
              <div>{currentUser.email}</div>
            </div>
          </div>
          <div className="border-t border-border text-sm mb-2">
            <button
              className="text-gray-400 cursor-not-allowed block w-full text-left px-4 py-2 hover:bg-bg-hover transition-colors"
              onClick={() => console.log("Profile")}
              disabled
            >
              Profile
            </button>
            <button
              className="block w-full text-left px-4 py-2 hover:bg-bg-hover transition-colors"
              onClick={handleLogout}
            >
              Log out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
