/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "rgba(var(--color-bg))",
        primary: "rgba(var(--color-primary))",
        secondary: "rgba(var(--color-secondary))",
        text: "rgba(var(--color-text))",
        hover: "rgba(var(--color-hover))",
        border: "rgba(var(--color-border))",
      },
    },
  },
  plugins: [],
};
