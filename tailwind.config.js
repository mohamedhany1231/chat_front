/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        main: "#673AB7",
        main_dark: "#512DA8",
        main_light: "#D1C4E9",

        secondary: "#448AFF",
        secondary_dark: "#224580",
        secondary_darker: "#0e1c33",
        secondary_light: "#a2c5ff",
        secondary_lighter: "#dae8ff",

        text_primary: "#212121",
        text_secondary: "#757575",
        text_divider: "#BDBDBD",
        bg_darker: "#150c25",
        bg_dark: "#1f1137",
      },
    },
  },
  plugins: [],
};
