module.exports = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
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
        blue: {
          DEFAULT: 'rgb(0, 122, 255)',
          dark: 'rgb(10, 132, 255)'
        },
        orange: {
          DEFAULT: 'rgb(255, 149, 0)',
          dark: 'rgb(255, 159, 10)'
        },
        gray: {
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
      backgroundImage: theme => ({
        wasm: "url('/_assets/icons/wasm-logo.svg')"
      }),
      screens: {
        'md': '500px'
      }
    },
  },
  variants: {},
  plugins: [],
  purge: process.env.NODE_ENV === 'production' ? {
    enabled: true,
    content: ['src/**/*.njk', 'src/**/*.js'],
    options: {
    }
  } : {}
}
