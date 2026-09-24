/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fff7ed',
          100: '#ffedd5',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          orange: '#FF5500',
          dark: '#1e293b',
          blue: '#1677ff',
        },
        whatsapp: {
          50: '#ecfdf5',
          500: '#25D366',
          600: '#128C7E',
          700: '#075E54',
        },
        priceoye: {
          blue: '#1677ff',
          lightBlue: '#e6f4ff',
          bg: '#f1f3f6',
          card: '#ffffff',
          dark: '#1e293b',
          text: '#212529',
          muted: '#6c757d',
          green: '#10b981',
          red: '#ef4444',
          border: '#e5e7eb'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'po': '0 2px 8px rgba(0,0,0,0.06)',
        'po-hover': '0 8px 24px rgba(0,0,0,0.12)',
        'admin': '0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.1)',
      }
    },
  },
  plugins: [],
}
