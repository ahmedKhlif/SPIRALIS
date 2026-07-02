import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        cream: "var(--cream)",
        "deep-olive": "var(--deep-olive)",
        "bottle-green": "var(--bottle-green)",
        sage: "var(--sage)",
        "pale-green": "var(--pale-green)",
        bamboo: "var(--bamboo)",
        "soft-beige": "var(--soft-beige)",
        "border-soft": "var(--border-soft)",
        "text-dark": "var(--text-dark)",
      },
      fontFamily: {
        heading: ["var(--font-heading)", "serif"],
        sans: ["var(--font-body)", "sans-serif"],
      },
      boxShadow: {
        soft: "0 20px 60px rgba(23, 58, 42, 0.08)",
        card: "0 16px 40px rgba(23, 58, 42, 0.07)",
      },
      borderRadius: {
        card: "24px",
      },
    },
  },
  plugins: [animate],
};

export default config;
