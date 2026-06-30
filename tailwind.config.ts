import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        virexa: {
          blue: "#2563EB",
          "blue-dark": "#1E40AF",
          navy: "#0F172A",
          purple: "#A78BFA",
          "purple-light": "#C4B5FD",
          mint: "#34D399",
          "mint-dark": "#059669",
          bg: "#F6F7FB",
          "bg-soft": "#EEF2FF",
          card: "#FFFFFF",
          muted: "#64748B",
        },
      },
      fontFamily: {
        display: ["Lexend", "system-ui", "sans-serif"],
        body: ["Inter", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl2: "1.25rem",
      },
    },
  },
  plugins: [],
};
export default config;
