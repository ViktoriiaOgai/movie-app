/** @type {import('tailwindcss').Config} */

  const tailwindConfig = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
  daisyui: {
    themes: ["winter"],
    styled: true,
  },
};
export default tailwindConfig;
