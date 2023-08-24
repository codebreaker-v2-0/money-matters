/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    colors: {
      loginPrimaryColor: "#f89a23",
      loginPrimaryColorLight: "#feedd6",
      loginSecondaryColor: "#02969c",
      lightColor: "#eeeded",
      errorColor: "#dc2626",
      inputColor: "#444",
      placeholderColor: "#999",
      loginGradient1: "#eef2f3",
      loginGradient2: "#8e9eab",
      transparent: "transparent",
      backgroundGray: "#f5f7fa",
      white: "#fff",
      btnPrimaryColor: "#2d60ff",
      btnPrimaryHoverColor: "#254ab8",
      creditColor: "#16dbaa",
      debitColor: "#fe5c73",
    },
  },
  plugins: [],
};
