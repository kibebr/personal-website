const { DateTime } = require('luxon')
const { minify } = require('uglify-js')
const deasync = require('deasync')
const isProduction = process.env.ELEVENTY_ENV === 'production'

const syncMinify = deasync(minify)

module.exports = {
  universalFilters: {
    htmlDateString: (dateObj) => {
      return DateTime.fromJSDate(dateObj, {
        zone: 'utc'
      }).toFormat('yyyy-LL-dd');
    }
  },
  nunjucksAsyncFilters: {
    jsmin: (code) => {
      if (!isProduction) {
        return code
      } else {
        try {
          console.log('minifying...')
          const minified = minify(code)
          return minified
        } catch (err) {
          console.error(err)
          return code
        }
      }
    }
  }
}
