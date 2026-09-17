/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          50: '#FDFBF7',
          100: '#FAF7F2',
          200: '#F4ECE1',
          300: '#EBDDCB',
          400: '#DEC9AF',
        },
        regal: {
          800: '#0C1B4A',
          900: '#071233',
          950: '#040B22',
        },
        gold: {
          50: '#FFFDF5',
          100: '#FDF8E6',
          200: '#FAF0C8',
          300: '#F5E29F',
          400: '#ECCF6A',
          500: '#DFB738',
          600: '#C29621',
          700: '#9B7215',
          800: '#7B5715',
          900: '#644616',
        },
        tiranga: {
          saffron: '#FF671F',
          white: '#FFFFFF',
          green: '#046A38',
          blue: '#06038D',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Outfit', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Cormorant Garamond', 'Georgia', 'serif'],
        display: ['Cinzel', 'Fraunces', 'Playfair Display', 'serif'],
        fraunces: ['Fraunces', 'serif'],
        cormorant: ['Cormorant Garamond', 'Georgia', 'serif'],
      },
      boxShadow: {
        'luxury': '0 10px 30px -5px rgba(7, 18, 51, 0.06), 0 4px 12px -2px rgba(7, 18, 51, 0.03)',
        'luxury-lg': '0 20px 40px -10px rgba(7, 18, 51, 0.1), 0 8px 20px -4px rgba(7, 18, 51, 0.05)',
        'seal': '0 0 0 4px rgba(223, 183, 56, 0.2), 0 4px 15px rgba(194, 150, 33, 0.25)',
      }
    },
  },
  plugins: [],
}
