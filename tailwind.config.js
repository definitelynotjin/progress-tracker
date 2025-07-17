// tailwind.config.js
// import scrollbar from '@tailwindcss-scrollbar';


module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}", // scan all JS/TS files in src/
        "./app/**/*.{js,jsx,ts,tsx}", // if using Next.js app folder
    ],
    theme: {
        extend: {}, // you can add custom styles here later
    },
    plugins: [
        scrollbar, // for better scrollbar styles
    ],
};
