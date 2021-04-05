const { DateTime } = require('luxon')
const { minify } = require('uglify-js')
const isProduction = process.env.ELEVENTY_ENV === 'production'

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
          const minified = minify(code)
          return minified.code
        } catch (err) {
          console.error(err)
          return code
        }
      }
    }
  }
}
