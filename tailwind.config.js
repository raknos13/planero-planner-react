/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "bg-primary": "rgba(var(--color-bg-primary))",
        "bg-secondary": "rgba(var(--color-bg-secondary))",
        "bg-card": "rgba(var(--color-bg-card))",
        "text-primary": "rgba(var(--color-text-primary))",
        "text-secondary": "rgba(var(--color-text-secondary))",
        border: "rgba(var(--color-border))",
        accent: "rgba(var(--color-accent))",
      },
    },
  },
  plugins: [],
};
