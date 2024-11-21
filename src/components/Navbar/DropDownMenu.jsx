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
      {currentUser.photoURL ? (
        <img
          src={currentUser.photoURL}
          alt="profile image"
          referrerPolicy="no-referrer"
          className="h-8 w-8 cursor-pointer rounded-full hover:shadow-lg"
          onClick={toggleDropdown}
        />
      ) : (
        <button
          className="flex h-7 w-7 items-center justify-center rounded-full bg-yellow-300 transition-colors duration-200 hover:bg-bg-hover hover:shadow-lg"
          onClick={toggleDropdown}
        >
          <span className="flex-1 text-black">
            {currentUser.displayName[0]}
          </span>
        </button>
      )}
      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-60 rounded-md bg-bg-card shadow-lg">
          <div className="flex items-center gap-3 p-4">
            <img
              src={currentUser.photoURL}
              alt="profile image"
              referrerPolicy="no-referrer"
              className="h-7 w-7 rounded-full"
              onClick={toggleDropdown}
            />
            {/* <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-yellow-300 text-black"> */}
            {/*   {currentUser.displayName[0]} */}
            {/* </div> */}
            <div className="text-wrap break-words text-sm font-bold">
              <div>{currentUser.displayName}</div>
              <div>{currentUser.email}</div>
            </div>
          </div>
          <div className="mb-2 border-t border-border text-sm">
            <button
              className="block w-full cursor-not-allowed px-4 py-2 text-left text-gray-400 transition-colors hover:bg-bg-hover"
              onClick={() => console.log("Profile")}
              disabled
            >
              Profile
            </button>
            <button
              className="block w-full px-4 py-2 text-left transition-colors hover:bg-bg-hover"
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
