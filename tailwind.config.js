export default { // Export Tailwind config.
  content: [ // Define files for class scanning.
    "./index.html", // Include the main HTML entry.
    "./src/**/*.{js,jsx,ts,tsx}", // Include all React source files.
  ],
  theme: { // Extend the default theme.
    extend: {}, // Leave theme extensions empty.
  },
  plugins: [], // Add no extra plugins.
};
