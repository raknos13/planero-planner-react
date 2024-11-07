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
        "bg-card-hover": "rgba(var(--color-bg-card-hover))",
        "text-primary": "rgba(var(--color-text-primary))",
        "text-secondary": "rgba(var(--color-text-secondary))",
        "bg-hover": "rgba(var(--color-hover))",
        border: "rgba(var(--color-border))",
        "border-hover": "rgba(var(--color-border-hover))",
        accent: "rgba(var(--color-accent))",
        "accent-hover": "rgba(var(--color-accent-hover))",
      },
    },
  },
  plugins: [],
};
