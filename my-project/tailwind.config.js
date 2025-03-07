/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: "#181818",
        light: "#2B2B2B",
      },
      backgroundImage: {
        "dark-gradiant": "linear-gradient(to bottom, #18181B, #2B2B2B)",
      },
      fontFamily: {
        NeueMachina: ["NeueMachina", "sans-serif"],
        signature: ["Signature", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        Gilgan: ["Gilgan", "sans-serif"],
        Crisp: ["Crisp", "sans-serif"],
      },
    },
    plugins: [],
  },
};
