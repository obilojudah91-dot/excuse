import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        obsidian: "#0A0A0A",
        ivory: "#F4F0E8",
        tangerine: "#FF5A1F",
        lime: "#C7F000",
        cyan: "#9DEBFF",
        graphite: "#202020",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-sans)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      fontSize: {
        "hero-sm": ["3.25rem", { lineHeight: "0.95", letterSpacing: "-0.02em" }],
        hero: ["6.5rem", { lineHeight: "0.9", letterSpacing: "-0.03em" }],
        "hero-lg": ["8.5rem", { lineHeight: "0.87", letterSpacing: "-0.03em" }],
      },
      keyframes: {
        scan: {
          "0%": { backgroundPosition: "0% 0%" },
          "100%": { backgroundPosition: "0% 200%" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.25" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        scan: "scan 3s linear infinite",
        blink: "blink 1.6s ease-in-out infinite",
        marquee: "marquee 22s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
