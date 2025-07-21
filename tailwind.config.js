/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/app/**/*.{js,ts,jsx,tsx}',
        './src/components/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
        './utilities/**/*.{js,ts,jsx,tsx}',
    ],
    safelist: [
        "bg-gray-800",
        "bg-purple-600",
        "bg-teal-500",
        "bg-lime-400",
        "bg-red-600", // fallback color
    ],
    theme: {
        extend: {},
    },
    plugins: [],
};
