module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", 
    "./public/index.html",
  ],
  theme: {
    extend: {
      height: {
        'screen-20px': 'calc(100vh - 20px)',
      },
    },
  },
  plugins: [],
};
