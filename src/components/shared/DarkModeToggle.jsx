import { useState, useEffect } from "react";
// import { FiSun, FiMoon } from "react-icons/fi";
import { LuMoonStar, LuSun } from "react-icons/lu";

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
      className="rounded-full p-1 hover:bg-bg-hover transition-colors"
      onClick={toggleDarkMode}
    >
      {isDarkMode ? <LuMoonStar size={26} /> : <LuSun size={26} />}
    </button>
  );
};
