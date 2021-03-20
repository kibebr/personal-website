const { fontFamily } = require('tailwindcss/defaultTheme')

module.exports = {
  darkMode: 'class',
  theme: {
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.black.apple'),
            tabSize: '2',
            p: {
              'line-height': '1.6'
            },
            a: {
              color: theme('colors.blue.DEFAULT'),
            },
            strong: {
              color: theme('colors.pink.DEFAULT')
            }
          }
        }
      }),
      fontFamily: {
        wotfard: ['Wotfard', ...fontFamily.sans]
      },
      colors: {
        blur: {
          DEFAULT: 'rgba(255, 255, 255, 0.6)',
          dark: 'rgba(29, 29, 31, 0.7)'
        },
        pixelado: {
          pink: '#FA8BFF',
          blue: '#2BD2FF',
          green: '#2BFF88'
        },
        black: {
          DEFAULT: '#000',
          apple: '#111'
        },
        white: {
          DEFAULT: '#ffffff',
          apple: '#f5f5f7'
        },
        pink: {
          DEFAULT: 'rgb(255, 45, 85)',
          dark: 'rgb(255, 55, 95)'
        },
        blue: {
          DEFAULT: 'rgb(0, 122, 255)',
          dark: 'rgb(10, 132, 255)'
        },
        orange: {
          DEFAULT: 'rgb(255, 149, 0)',
          dark: 'rgb(255, 159, 10)'
        },
        gray: {
          50: '#F4F5F7',
          slight: 'rgba(0, 0, 0, 0.1)',
          text: 'rgb(108, 108, 112)',
          'text-dark': '#A1A1A6',
          DEFAULT: '#F2F2F2',
          'slight-dark': 'rgba(255, 255, 255, 0.1)',
          dark: '#0d0d0d'
        },
        red: {
          DEFAULT: 'rgb(255, 59, 48)',
          dark: 'rgb(255, 69, 58)'
        },
      },
      width: {
        inherit: 'inherit',
        'line': 'calc(98.5% - 80px)',
        '17': '4.25rem',
        '18': '4.5rem'
      },
      height: {
        '17': '4.25rem',
        '18': '4.5rem',
        '112': '28rem',
        '128': '32rem'
      },
      fontSize: {
        'smsm': '.80rem'
      },
      backgroundImage: () => ({
        wasm: "url('/_assets/icons/wasm-logo.svg')"
      }),
      transitionProperty: {
        'height': 'height, max-height'
      },
      fontFamily: {
        fastyper: ['VT323']
      }
    },
    backdropFilter: {
      blur: 'blur(20px) saturate(180%)'
    }
  },
  variants: {
    extend: {
      height: ['hover']
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwindcss-filters')
  ],
  purge: {
    enabled: true,
    content: ['src/**/*.liquid', 'src/**/*.js'],
    options: {
    }
  }
}
