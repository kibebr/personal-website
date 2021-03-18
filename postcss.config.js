module.exports = {
  plugins: [
    require('@tailwindcss/jit')('./tailwind.config.js'),
    require('autoprefixer')
  ]
}
