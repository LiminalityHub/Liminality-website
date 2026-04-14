/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'liminal-bg': '#F5F4EF',
        'liminal-primary': '#0E0D0A',
        'liminal-secondary': 'rgba(14, 13, 10, 0.42)',
        'liminal-tertiary': 'rgba(14, 13, 10, 0.22)',
        'liminal-quaternary': 'rgba(14, 13, 10, 0.10)',
      },
      fontFamily: {
        mono: ['"Space Mono"', 'monospace'],
        grotesk: ['"Space Grotesk"', 'sans-serif'],
        // keep legacy names for any JSX not yet migrated
        sans: ['"Space Grotesk"', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['"Space Mono"', 'monospace'],
      },
      letterSpacing: {
        widest2: '0.2em',
      },
    },
  },
  plugins: [],
};
