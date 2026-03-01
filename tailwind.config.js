/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          900: '#0F172A',
          700: '#1E293B',
          500: '#334155'
        },
        accent: {
          50: '#EFF6FF',
          500: '#3B82F6',
          400: '#60A5FA',
          300: '#93C5FD'
        },
        success: '#22C55E',
        warning: '#F59E0B',
        danger: '#EF4444',
        neutral: {
          bg: '#F8FAFC',
          border: '#E2E8F0',
          muted: '#CBD5E1'
        },
        slate: {
          50: '#F8FAFC',
          100: '#F8FAFC',
          200: '#E2E8F0',
          300: '#E2E8F0',
          400: '#CBD5E1',
          500: '#334155',
          600: '#334155',
          700: '#1E293B',
          800: '#0F172A',
          900: '#0F172A'
        },
        slateBlue: {
          50: '#EFF6FF',
          100: '#93C5FD',
          300: '#93C5FD',
          600: '#3B82F6',
          700: '#60A5FA'
        },
        rose: {
          50: '#FEE2E2',
          100: '#FEE2E2',
          200: '#FECACA',
          400: '#EF4444',
          500: '#EF4444',
          600: '#EF4444',
          700: '#EF4444',
          800: '#EF4444'
        },
        emerald: {
          100: '#DCFCE7',
          700: '#22C55E'
        },
        amber: {
          100: '#FEF3C7',
          700: '#F59E0B'
        },
        sky: {
          100: '#DBEAFE',
          700: '#3B82F6'
        }
      },
      maxWidth: {
        content: '1440px'
      },
      width: {
        sidebar: '260px',
        'sidebar-collapsed': '80px'
      },
      borderRadius: {
        '2xl': '1rem'
      },
      boxShadow: {
        lg: '0 10px 30px rgba(15, 23, 42, 0.08)'
      },
      transitionProperty: {
        sidebar: 'width'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 }
        },
        modalIn: {
          '0%': { opacity: 0, transform: 'translateY(12px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' }
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' }
        }
      },
      animation: {
        'fade-in': 'fadeIn 300ms ease-in-out',
        'modal-in': 'modalIn 300ms ease-in-out',
        shimmer: 'shimmer 1.6s ease-in-out infinite'
      },
      backgroundImage: {
        'accent-gradient': 'linear-gradient(135deg, #93C5FD 0%, #60A5FA 50%, #3B82F6 100%)',
        shimmer:
          'linear-gradient(90deg, rgba(226,232,240,0.5) 25%, rgba(248,250,252,0.85) 50%, rgba(226,232,240,0.5) 75%)'
      }
    }
  },
  plugins: []
};
