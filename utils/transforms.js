const htmlmin = require("html-minifier")
const isProduction = process.env.ELEVENTY_ENV === 'production'

module.exports = {
  compressHTML: (content, outputPath) => {
    if (outputPath.endsWith(".html")) {
      let minified = htmlmin.minify(content, {
        minifyURLs: true,
        minifyJS: true,
        minifyCSS: true,
        removeComments: true,
        removeRedundantAttributes: true,
        useShortDoctype: true
      })

      return minified
    }
    return content
  }
}

