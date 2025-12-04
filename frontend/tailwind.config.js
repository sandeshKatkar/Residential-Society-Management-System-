/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#22177A",
        secondary: "#605EA1",
        accent: "#8EA3A6",
        lite: "#E6E9AF",
      },
    },
  },
  plugins: [],
};
