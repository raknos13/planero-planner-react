import { useState, useEffect } from "react";
import { FiSun, FiMoon } from "react-icons/fi";

export const DarkModeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prevState) => !prevState);
  };

  return (
    <button
      className="p-2 rounded-full hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
      onClick={toggleDarkMode}
    >
      {isDarkMode ? <FiMoon size={26} /> : <FiSun size={26} />}
    </button>
  );
};
