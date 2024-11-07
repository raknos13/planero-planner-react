import { useEffect } from "react";
// import { FiSun, FiMoon } from "react-icons/fi";
import { LuMoonStar, LuSun } from "react-icons/lu";
import { useTheme } from "../../contexts";

export const DarkModeToggle = () => {
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
    }
  }, [theme]);

  const toggleDarkMode = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <button
      className="rounded-full p-1 hover:bg-bg-hover transition-colors"
      onClick={toggleDarkMode}
    >
      {theme === "dark" ? <LuMoonStar size={26} /> : <LuSun size={26} />}
    </button>
  );
};
