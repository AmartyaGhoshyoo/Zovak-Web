import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // "ink" naming kept for continuity — represents the light base
        // surface (a warm beige), not a dark one.
        ink: "#F1E7D2",
        "ink-soft": "#E8DBC0",
        "ink-elev": "#FBF8F0",
        border: {
          DEFAULT: "rgba(60,45,20,0.10)",
          strong: "rgba(60,45,20,0.18)",
        },
        text: {
          DEFAULT: "#241D10",
          muted: "#6B5D45",
          faint: "#7A6E54",
        },
        accent: {
          DEFAULT: "#2F6B4F",
          hover: "#3C7F5F",
          soft: "rgba(47,107,79,0.12)",
        },
        accent2: {
          DEFAULT: "#5FAF6A",
          soft: "rgba(95, 175, 106, 0.14)",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      maxWidth: {
        wrap: "1160px",
      },
      keyframes: {
        blink: {
          "0%, 50%": { opacity: "1" },
          "50.01%, 100%": { opacity: "0" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.6", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.08)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "node-pulse": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.55", transform: "scale(1.4)" },
        },
        "orbit-spin": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        "dash-flow": {
          to: { strokeDashoffset: "-24" },
        },
        "bar-rise": {
          "0%, 100%": { transform: "scaleY(0.35)" },
          "50%": { transform: "scaleY(1)" },
        },
        "scan-y": {
          "0%": { transform: "translateY(0)", opacity: "0" },
          "10%": { opacity: "1" },
          "90%": { opacity: "1" },
          "100%": { transform: "translateY(50px)", opacity: "0" },
        },
        shine: {
          "0%": { transform: "translateX(-150%)" },
          "100%": { transform: "translateX(250%)" },
        },
        "grow-x": {
          from: { transform: "scaleX(0)" },
          to: { transform: "scaleX(1)" },
        },
        "bead-travel": {
          "0%": { left: "0%" },
          "100%": { left: "100%" },
        },
        "terminal-glow": {
          "0%, 100%": { boxShadow: "0 40px 90px -30px rgba(47,107,79,0.35)" },
          "50%": { boxShadow: "0 40px 100px -20px rgba(47,107,79,0.55)" },
        },
      },
      animation: {
        blink: "blink 1s step-end infinite",
        "pulse-glow": "pulse-glow 6s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        marquee: "marquee 28s linear infinite",
        "node-pulse": "node-pulse 2.2s ease-in-out infinite",
        "orbit-spin": "orbit-spin 8s linear infinite",
        "dash-flow": "dash-flow 1.4s linear infinite",
        "bar-rise": "bar-rise 2.4s ease-in-out infinite",
        "scan-y": "scan-y 3s ease-in-out infinite",
        shine: "shine 1.1s ease-in-out infinite",
        "grow-x": "grow-x 1.8s cubic-bezier(0.16,0.8,0.3,1) forwards",
        "bead-travel": "bead-travel 3.2s ease-in-out infinite alternate",
        "terminal-glow": "terminal-glow 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
