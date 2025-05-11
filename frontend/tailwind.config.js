/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      width: {
        'full-minus-20': 'calc(100% - 20px)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(at bottom, #1F7CFF, #ffffff, #ffffff)',
      },
      backgroundSize: {
        '200': '200% 200%',
      },
      keyframes: {
        gradientMove: {
          '0%': { backgroundPosition: '50% 40%' },
          '50%': { backgroundPosition: '50% 60%' },
          '100%': { backgroundPosition: '50% 40%' },
        },
      },
      animation: {
        gradientMove: 'gradientMove 5s infinite',
      },
      colors: {
        "SGBUS-green": "#70E000",  
        "lime": "#CCFF33",  
        "cal-poly-green": "#004B23", 
        "lime-green": "#31CB00", 
        "Honeydew": "#F0FFF1", 
        "WhiteSmoke": "#f7f8f6",
        "AntiFlash": "#F2F2F2",
        "BabyBlue": "#40F2FF",
        "Charcoal": "#404040",
        "BlackOut": "#222222",
        "LightSilver": "#D9D9D9"
      },
      screens: {
        signup: "980px",
        nav: "875px",
        gallery: "1525px",
        admin: "1200px",
      },
      fontFamily: {
        inter: ["Inter"],
      },
      borderRadius: {
        large: "40px",
        "extra-large": "110px",
        full: "9999px",
      },
    },
  },
  plugins: [
     require('tailwind-scrollbar'),
  ],
};
