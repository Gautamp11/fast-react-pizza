/** @type {import('tailwindcss').Config} */
//eslint-disable-next
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      //overwring default font
      sans: "Roboto Mono,monospace",
    },
    extend: {
      height: {
        screen: "100dvh",
      },
    },
  },
  plugins: [],
};
