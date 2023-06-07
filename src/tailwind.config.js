const colors = require('tailwindcss/colors');

module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    theme: {
        colors: {
            white: colors.white,
            black: colors.black,
            gray: colors.gray,
            success: colors.green,
            danger: colors.red,
            warning: colors.orange,
            teal: colors.teal,
            blue: colors.sky,
            gold: colors.yellow,
        },
        fontFamily: {
            sans: ['Graphik', 'sans-serif'],
            serif: ['Merriweather', 'serif'],
            lato: ['Lato', 'sans-serif'],
            oswald: ['Oswald', 'sans-serif'],
            exo: ['Exo', 'sans-serif'],
            catamaran: ['Catamaran', 'sans-serif'],
            mukta: ['Mukta Vaani', 'sans-serif'],
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
