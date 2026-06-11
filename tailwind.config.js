/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2E7D32',
        'primary-dark': '#1B5E20',
        'primary-light': '#4CAF50',
        'green-light': '#E8F5E9',
        'bg-main': '#F8F9F4',
        'text-main': '#212121',
        'text-muted': '#6B7280',
        'alert-red': '#E53935',
        'warning-orange': '#FB8C00',
        'healthy-green': '#43A047',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 2px 12px rgba(0,0,0,0.08)',
        'card-hover': '0 4px 20px rgba(0,0,0,0.12)',
      },
      borderRadius: {
        'xl': '16px',
        '2xl': '20px',
        '3xl': '24px',
      }
    },
  },
  plugins: [],
}
