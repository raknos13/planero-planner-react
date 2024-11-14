/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "bg-primary": "hsla(var(--color-bg-primary))",
        "bg-secondary": "hsla(var(--color-bg-secondary))",
        "bg-card": "hsla(var(--color-bg-card))",
        "bg-card-hover": "hsla(var(--color-bg-card-hover))",
        "text-primary": "hsla(var(--color-text-primary))",
        "text-secondary": "hsla(var(--color-text-secondary))",
        "bg-hover": "hsla(var(--color-hover))",
        border: "hsla(var(--color-border))",
        "border-hover": "hsla(var(--color-border-hover))",
        accent: "hsla(var(--color-accent))",
        "accent-hover": "hsla(var(--color-accent-hover))",
      },
    },
  },
};
