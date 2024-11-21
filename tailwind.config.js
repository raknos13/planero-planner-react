/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "hsl(var(--color-primary) / <alpha-value>)",
        "secondary": "hsl(var(--color-secondary) / <alpha-value>)",
        "bg-card": "hsl(var(--color-bg-card) / <alpha-value>)",
        "bg-card-hover": "hsl(var(--color-bg-card-hover) / <alpha-value>)",
        "text-primary": "hsl(var(--color-text-primary) / <alpha-value>)",
        "text-secondary": "hsl(var(--color-text-secondary) / <alpha-value>)",
        "bg-hover": "hsl(var(--color-hover) / <alpha-value>)",
        border: "hsl(var(--color-border) / <alpha-value>)",
        "border-hover": "hsl(var(--color-border-hover) / <alpha-value>)",
        accent: "hsl(var(--color-accent) / <alpha-value>)",
        "accent-hover": "hsl(var(--color-accent-hover) / <alpha-value>)",
      },
    },
  },
};
