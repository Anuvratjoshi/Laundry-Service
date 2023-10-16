/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      es: "360px",
      // => @media (min-width: 360px) { ... }
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      xxl: "1536px",
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      colors: {
        primary: "#0F4835",
        secondary: "#1B8964",
        adminPrimary: "#189FB3",
        adminSecondary: "#26B4AB",
      },
      fontFamily: {
        red: ["Red Hat Display", "sans-serif"],
        Montserrat: ["Montserrat", "sans-serif"],
      },
      dropShadow: {
        "2xl": "rgba(0, 0, 0, 0.35) 0px 5px 10px  ",
        "3xl": "rgba(100 100 111 / 20%) 0px 5px 20px 0px ",
      },
    },
  },
  plugins: [],
};
