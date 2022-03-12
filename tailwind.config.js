module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors : {
        primary : '#E2E2E2',
        hover_primary : '#1DA1F2',
        BgLightBlue : '#E1F5FE',
        light : '#a5d0f5',
        lighter : '#D4E5F4',
        border_line : '#9C9C9C',
        button_hover : '#6699FF'
      }
    },
  },
  plugins: [],
}